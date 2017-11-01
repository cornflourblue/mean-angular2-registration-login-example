﻿var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var nodemailer = require('nodemailer');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.invite = invite;

module.exports = service;

var myEmailAddr = "emailaddress@gmail.com"; // FIXME
var myEmailPass = "this_is_a_password"; // FIXME

function authenticate(username, password) {
    var deferred = Q.defer();

    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                username: user.username,
                token: jwt.sign({ sub: user._id }, config.secret)
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(caller, userParam) {
    var deferred = Q.defer();
    if (caller === null || caller === undefined || caller.sub === null || caller.sub === undefined) {
	    deferred.reject("User is not authenticated.");
    } else {
        // validation
        db.users.findById(caller.sub, function (err, userObj) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (userObj.type != "admin") deferred.reject("Only an admin can create an account.");
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + userParam.username + '" is already taken');
                    } else {
                        createUser();
                    }
            });
        });
    }

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function invite(userParam) {
	var deferred = Q.defer();
	user = userParam;
	if (user.email === null || user.email === undefined || user.email === "") {
		deferred.reject("Email must be supplied for invitations");
	} else {

            db.users.findOne(
                { email: user.email },
                function (err, foundUser) {
                    if (err) deferred.reject(err.name + ': ' + err.message);
                    if (foundUser) {
                        // username already exists
                        deferred.reject('Email address "' + user.email + '" is already in use');
                    } else {
                        createUser();
                    }
            });
	}

	function createUser() {
	    user.username = "";
            user.hash = "";
	    user.lastToken = jwt.sign({payload: user.email}, config.secret);
            db.users.insert(
                user,
                function (err, doc) {
                    if (err) deferred.reject(err.name + ': ' + err.message);
            });

            var transporter = nodemailer.createTransport({
            	  service: 'gmail',
            	  auth: {
            		      user: myEmailAddr,
            		      pass: myEmailPass
                      }
            });
            
            var mailOptions = {
            	  from: myEmailAddr,
            	  to: user.email,
                  subject: 'Invitation to OmniValley',
                  text: 'Click the link below to register your account:\nhttp://omnivalley.com/register?token=' + user.lastToken
            };
            
            transporter.sendMail(mailOptions, function(error, info){
            	  if (error) {
	              deferred.reject("Error sending email: " + error);
//            	      console.log(error);
            	  } else {
//                      console.log('Email sent: ' + info.response);
                      deferred.resolve();
	          }
             });
	}
	return deferred.promise;
}

function register(token, userParams) {
    var deferred = Q.defer();
    try {
        var decodedEmail = jwt.verify(token, config.secret);
    } catch (e) {
        deferred.reject("Bad token");
    }

    db.users.findOne(
	{ email: decodedEmail, lastToken: token},
	function (err, user) {
	    if (err) deferred.reject(err.name + ': ' + err.message);
	    if (!foundUser) {
		// username already exists
		deferred.reject("Token not found as lastToken in database for any user.");
	    } else {
		update(user._id, userParams).then( function(){
			deferred.resolve();
		}).catch(function(err) {
			deferred.reject("Updating user failed");
		});
	    }
    });

    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            username: userParam.username,
            orgName: userParam.orgName,
            location: userParam.location,
            founded: userParam.founded,
            contactName: userParam.contactName,
            contactTitle: userParam.contactTitle,
            contactEmail: userParam.contactEmail,
            contactPhone: userParam.contactPhone,
            emphasizedIndustries: userParam.emphasizedIndustries,
            team: userParam.team,
            cohorts: userParam.cohorts,
            valueProp: userParam.valueProp,
            raisingCohort: userParam.raisingCohort,
            raisingGrads: userParam.raisingGrads,
            raisingOther: userParam.raisingOther,
            orgType: userParam.orgType,
            assetsUnderManagement: userParam.assetsUnderManagement,
            directInvestProgram: userParam.directInvestProgram,
            coInvestProgram: userParam.coInvestProgram,
            affiliates: userParam.affiliates
        };

        //don't store null values
        clean(set);

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function clean(obj) {
  var propNames = Object.getOwnPropertyNames(obj);
  for (var i = 0; i < propNames.length; i++) {
    var propName = propNames[i];
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

function _delete(user, _id) {
    var deferred = Q.defer();
    if (user === null || user === undefined || user.sub === null || user.sub === undefined) {
	    deferred.reject("User is not authenticated.");
    }
    // Authenticate calling user and remove target user
    db.users.findById(user.sub, function (err, userObj) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        if (user.sub === _id || userObj.type === "admin" ) {
            db.users.remove(
                { _id: mongo.helper.toObjectID(_id) },
                function (err) {
                    if (err) deferred.reject(err.name + ': ' + err.message);
                    deferred.resolve();
                });
        } else {
            deferred.reject("You do not have permission to delete this user.");
        }
    });

    return deferred.promise;
}

# OmniValley

Exclusive Investment Network

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Node v8.4.0
NPM v5.4.1
A browser that supports Angular 4 - See https://angular.io/guide/browser-support

### Installing

Install latest versions of Node and NPM (v8.4.0 and v5.4.1 respectively) if not already installed
Install MongoDB (v3.4.7) Start it if it doesn't start automatically by typing mongod into your terminal, using the default port.
Download the source code using ‘git clone https://github.com/tmfahey/omnivalley.git’.
Navigate into the server and client directories. The first time you navigate into these directories you will have to run ‘npm install’. This installs all of the node dependencies. 
In each of the server and client directories, run ‘npm start’ to start the servers.
Open a browser directed to localhost:3000

## Testing

Open a browser to localhost:3000
Click Register -> /register, add an admin user.
Register an investor or accelerator user.
Login to the investor/accelerator
Use the navigation bar - click each button to move to a page
OmniValley logo -> /, / - redirects to /landing if authenticated, otherwise /login
/landing - the landing page for a user, redirects to home
/login - login prompt. Log in here using credentials created in /register.
About Us -> /aboutus - static page with information about the OmniValley crew
Account -> Dropdown
	Your Profile -> /account - view your profile information
	Settings -> /settings -> /settings/profile - edit your profile information
		Account -> /settings/account - Edit your username/password
	Sign out -> sign out.  After this, log back in as the admin user.
Other admin-only pages to view (no links, enter into address bar):
/adminInvite - invite a new user
/userManagement - delete the investor user


## License

This project is licensed under the MIT License



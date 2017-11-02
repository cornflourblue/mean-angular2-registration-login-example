import { Component, OnInit, Inject } from '@angular/core';
import { User, Accelerator, TeamMember, Cohort, Company} from '../_models/index';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'profilesettings.component.html'
})

export class ProfileSettingsComponent implements OnInit {
    model: any = {};
    loading = false;
    currentUser: any;
    testUser: User;
    users: User[] = [];
    addTeamFormOpen: boolean = false;
    addCohortFormOpen: boolean = false;

    constructor(private userService: UserService,
                private router: Router,
                private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.userService.getById(this.currentUser._id).subscribe(
            currentUser => {
                this.currentUser = currentUser;
                if(this.currentUser.cohorts){
                    for (let cohort of this.currentUser.cohorts) {
                        cohort.addCompanyFormOpen = false;
                    }
                }
                
            });
    }

    update() {
        this.loading = true;
        this.userService.update(this.currentUser)
            .subscribe(
                data => {
                    this.alertService.success('Profile updated', true);
                    this.loading = false;
                    window.scrollTo(0, 0);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    addCohort() {
        if(!this.currentUser.cohorts){
            this.currentUser.cohorts =  Array<Cohort>();
        }
        let cohort = new Cohort();
        cohort.name = this.model.input_cohort_name;
        cohort.location = this.model.input_cohort_location;
        cohort.date = this.model.input_cohort_date;
        cohort.companies = Array<Company>();
        this.currentUser.cohorts.push(cohort);
        this.model.input_cohort_name = this.model.input_cohort_location =
            this.model.input_cohort_date = null;
        this.addCohortFormOpen = false;
    }

    addCompany(cohort: any) {
        console.log(cohort);
        let index = this.currentUser.cohorts.indexOf(cohort);
        console.log(index);
        let company = new Company();
        company.name = cohort.input_company_name;
        company.location = cohort.input_company_location;
        company.date = cohort.input_company_date;
        company.url = cohort.input_company_url;
        company.exitValue = cohort.input_company_exit_value;
        company.fundingTotal = cohort.input_company_funding_total;
        this.currentUser.cohorts[index].companies.push(company);
        cohort.input_company_name = cohort.input_company_location = cohort.input_company_date
             = cohort.input_company_url = cohort.input_company_exit_value
             = cohort.input_company_funding_total = null;
        cohort.addCompanyFormOpen = false;
    }

    addTeamMember() {
        if(!this.currentUser.team){
            this.currentUser.team =  Array<TeamMember>();
        }
        let tempMember = new TeamMember();
        tempMember.firstName = this.model.input_member_firstname;
        tempMember.lastName = this.model.input_member_lastname;
        tempMember.description = this.model.input_member_description;
        tempMember.linkedInURL = this.model.input_member_linkedInURL;
        this.currentUser.team.push(tempMember);
        this.model.input_member_firstname = this.model.input_member_lastname =
            this.model.input_member_description = this.model.input_member_linkedInURL = null;
        this.addTeamFormOpen = false;
    }

    deleteTeamMember(temp: TeamMember){
        this.currentUser.team = this.currentUser.team.filter((item: TeamMember) => item !== temp);
    }

}

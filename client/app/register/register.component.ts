import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, Cohort, Company, TeamMember} from '../_models/index';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    users: User[] = [];
    addTeamFormOpen : boolean = false;
    addCohortFormOpen: boolean = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    addCohort() {
        if(!this.model.cohorts){
            this.model.cohorts = Array<Cohort>();
        }
        let cohort = new Cohort();
        cohort.name = this.model.input_cohort_name;
        cohort.location = this.model.input_cohort_location;
        cohort.date = this.model.input_cohort_date;
        cohort.companies = Array<Company>();
        this.model.cohorts.push(cohort);
        this.model.input_cohort_name = this.model.input_cohort_location =
            this.model.input_cohort_date = null;
        this.addCohortFormOpen = false;
    }

    addCompany(cohort: any) {
        console.log(cohort);
        let index = this.model.cohorts.indexOf(cohort);
        console.log(index);
        let company = new Company();
        company.name = cohort.input_company_name;
        company.location = cohort.input_company_location;
        company.date = cohort.input_company_date;
        company.url = cohort.input_company_url;
        company.exitValue = cohort.input_company_exit_value;
        company.fundingTotal = cohort.input_company_funding_total;
        this.model.cohorts[index].companies.push(company);
        cohort.input_company_name = cohort.input_company_location = cohort.input_company_date
            = cohort.input_company_url = cohort.input_company_exit_value
            = cohort.input_company_funding_total = null;
        cohort.addCompanyFormOpen = false;
    }

    addTeamMember() {
        if(!this.model.team){
            this.model.team =  Array<TeamMember>();
        }
        let tempMember = new TeamMember();
        tempMember.firstName = this.model.input_member_firstname;
        tempMember.lastName = this.model.input_member_lastname;
        tempMember.description = this.model.input_member_description;
        tempMember.linkedInURL = this.model.input_member_linkedInURL;
        this.model.team.push(tempMember);
        this.model.input_member_firstname = this.model.input_member_lastname =
            this.model.input_member_description = this.model.input_member_linkedInURL = null;
        this.addTeamFormOpen = false;
    }

    deleteTeamMember(temp: TeamMember){
        this.model.team = this.model.team.filter((item: TeamMember) => item !== temp);
    }

}

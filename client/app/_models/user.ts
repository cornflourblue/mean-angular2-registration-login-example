export class User {
    _id: string;
    username: string;
    password: string;
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export class Accelerator extends User {
    readonly type: string = "accelerator";
    logo: string;
    orgName: string;
    location: string;
    founded: string;
    contactName: string;
    contactTitle: string;
    contactEmail: string;
    contactPhone: string;
    emphasizedIndustries: string[];
    team: Array<TeamMember> = [];
	
    cohorts: Array<Cohort> = [];
    valueProp: string;
    raisingCohort: boolean;
    raisingGrads: boolean;
    raisingOther: boolean;
    startupsFunded: number;
    startupExits: number;
    exitValue: number;
    fundingTotal: number;

    constructor(username: string, password: string) { super(username, password); }
}

export class Investor extends User{
	readonly type: string = "investor";
    logo: string;
    orgName: string;
    location: string;
    founded: string;
    contactName: string;
    contactTitle: string;
    contactEmail: string;
    contactPhone: string;
    emphasizedIndustries: string[];
    team: Array<TeamMember> = [];

    orgType: string;
    assetsUnderManagement: number;
    directInvestProgram: boolean;
    coInvestProgram: boolean;
    affiliates: string[];
    cohorts: Array<Cohort> = [];
    valueProp: string;
}

export class Administrator extends User{
    readonly type: string = "admin";
}

export class TeamMember{
    _id: string;
    firstName: string;
    lastName: string;
    linkedInURL: string;
}

export class Cohort{
    _id: string;
    name: string;
    location: string;
    date: string;
    companies: Array<Company> = [];
}

export class Company{
    _id: string;
    name: string;
    location: string;
    date: string;
    url: string;
    exitValue: number;
    fundingTotal: number;
}

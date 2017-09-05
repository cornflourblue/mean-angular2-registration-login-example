export class User {
    _id: string;
    username: string;
    password: string;
    logo: string;
    orgName: string;
    location: string;
    founded: string;
    contactName: string;
    contactTitle: string;
    contactEmail: string;
    contactPhone: string;
    emphasizedIndustries: string[];
    team: { name: string, linkedIn: string }[];

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export class Accelerator extends User {
	readonly type: string = "accelerator";
    cohorts: {name: string, location: string, date: string, numberCompanies: number, exitValue: number, fundingTotal: number};
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
    orgType: string;
    assetsUnderManagement: number;
    directInvestProgram: boolean;
    coInvestProgram: boolean;
    affiliates: string[];
    cohorts: {name: string, location: string, date: string, numberCompanies: number, exitValue: number, fundingTotal: number};
    valueProp: string;
}

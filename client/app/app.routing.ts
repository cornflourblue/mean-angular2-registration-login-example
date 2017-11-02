import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LandingComponent } from './landing/index';
import { AccountComponent } from './account/index';
import { SettingsComponent, ProfileSettingsComponent, AccountSettingsComponent} from './settings/index';
import { LoginComponent } from './login/index';
import { RegisterComponent, RegisterAcceleratorComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { AdminInviteComponent } from './adminInvite/index';
import { UserManagementComponent } from './userManagement/index';
import { AboutUsComponent} from './aboutus/index';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'landing', component: LandingComponent},
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard],
		children: [
			{ path: '', redirectTo: 'profile', pathMatch:'full' },
			{ path: 'profile', component: ProfileSettingsComponent},
			{ path: 'account', component: AccountSettingsComponent}
		]
	},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'register/accelerator', component: RegisterAcceleratorComponent },
    { path: 'adminInvite', component: AdminInviteComponent },
    { path: 'userManagement', component: UserManagementComponent },
    { path: 'aboutus', component: AboutUsComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

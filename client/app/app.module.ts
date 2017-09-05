import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { customHttpProvider } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { SettingsComponent, ProfileSettingsComponent, AccountSettingsComponent} from './settings/index';
import { AccountComponent } from './account/index';
import { LoginComponent } from './login/index';
import { RegisterComponent, RegisterAcceleratorComponent } from './register/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        SettingsComponent,
        ProfileSettingsComponent,
        AccountSettingsComponent,
        AccountComponent,
        LoginComponent,
        RegisterComponent,
        RegisterAcceleratorComponent
    ],
    providers: [
        customHttpProvider,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
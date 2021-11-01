import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutes } from './authentication.routing';
import { SigninComponent } from './signin/signin.component';
import { FuseLogin2Component } from './login/login.component';
import { AuthenticationService } from "../../shared/services/AuthenticationService";
import { FuseConfigService } from '../../core/services/config.service';
import { SharedModule } from '../../core/modules/shared.module';
// import { SignupComponent } from './signup/signup.component';
// import { ForgotComponent } from './forgot/forgot.component';
// import { LockscreenComponent } from './lockscreen/lockscreen.component';

// import { RegisteredService } from "./services/doanhnghiep.registered.service";
// import { ActiveComponent } from "app/qlctregistered/authentication/active/active.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ SigninComponent, FuseLogin2Component],
  providers: [AuthenticationService, FuseConfigService]
})

export class AuthenticationModule { }

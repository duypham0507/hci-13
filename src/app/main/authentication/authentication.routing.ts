import { Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { FuseLogin2Component } from './login/login.component';
// import { SignupComponent } from './signup/signup.component';
// import { ForgotComponent } from './forgot/forgot.component';
// import { LockscreenComponent } from './lockscreen/lockscreen.component';
// import { ActiveComponent } from "./active/active.component";

export const AuthenticationRoutes: Routes = [
    // {
    //     path: 'authentication/signin',
    //     component: SigninComponent,
    // },
    {
        path: 'authentication/login',
        component: FuseLogin2Component
    }
];

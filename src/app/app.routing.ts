import { Routes } from '@angular/router';
import { FuseLogin2Component } from './main/authentication/login/login.component';
import { AuthGuard } from './shared/auth.guard';

export const AppRoutes: Routes = [
    {
        path      : '',
        component: FuseLogin2Component,
        // loadChildren: './main/authentication/authentication.module#AuthenticationModule'
    },
    {
        path        : 'student-manager',
        loadChildren: './student-manager/student-manager.module#StudentManagerModule',
    },
    {
        path: 'authentication',
        loadChildren: () => import('./main/authentication/authentication.module').then(m => m.AuthenticationModule)
        
    },
    {
        path: 'errors',
        loadChildren: () => import('./errors/errors.module').then(m => m.ErrorsModule)
    },
    {
        path: '**',
        redirectTo: 'error/404'
    }
];

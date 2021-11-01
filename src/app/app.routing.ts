import { Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

export const AppRoutes: Routes = [
    {
        path      : '',
        canActivate: [AuthGuard],
        children: [
            {
                path        : 'student-manager',
                loadChildren: './student-manager/student-manager.module#StudentManagerModule',
            },
        ]    
    },
    {
        path        : 'authentication',
        loadChildren: './main/authentication/authentication.module#AuthenticationModule'
    },
    {
        path: '**',
        redirectTo: 'error/404'
    }
];

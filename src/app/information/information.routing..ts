import { Routes } from '@angular/router';
import { AuthGuard } from 'app/shared/auth.guard';
import { StudentInfoComponent } from './student-info/student-info.component';
import { SubjectJoinComponent } from './subject-join/subject-join.component';
import { SystemInfoComponent } from './system-info/system-info.component';





export const InformationRoutes: Routes = [
    {
        path     : 'student-info',
        component: StudentInfoComponent,
        // canActivate: [AuthGuard]
    },
    {
        path     : 'system-info',
        component: SystemInfoComponent,
        // canActivate: [AuthGuard]
    },
    {
        path     : 'subject-join',
        component: SubjectJoinComponent,
        // canActivate: [AuthGuard]
    },
];
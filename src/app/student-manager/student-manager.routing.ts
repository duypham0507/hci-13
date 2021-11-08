import { Routes } from '@angular/router';
import { AuthGuard } from 'app/shared/auth.guard';
import { ListStudentComponent } from './student-list/list-student.component';
import { SubjectListComponent } from './subject-list/subject-list.component';




export const StudentManagerRoutes: Routes = [
    {
        path     : 'student-list',
        component: ListStudentComponent,
        // canActivate: [AuthGuard]
    },
    {
        path     : 'subject-list',
        component: SubjectListComponent,
        // canActivate: [AuthGuard]
    },
];

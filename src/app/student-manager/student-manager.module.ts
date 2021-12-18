import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { FuseNavigationModule } from 'app/core/components/navigation/navigation.module';
import { FuseShortcutsModule } from 'app/core/components/shortcuts/shortcuts.module';
import { FuseSearchBarModule } from 'app/core/components/search-bar/search-bar.module';
import { StudentManagerRoutes } from './student-manager.routing';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { ListStudentComponent } from './student-list/list-student.component';
import { AddStudentComponent } from './student-list/add-student/add-student.component';
import { AuthGuard } from 'app/shared/auth.guard';
import { AuthenticationService } from 'app/shared/services/AuthenticationService';
import { SubjectSubscribeComponent } from './subject-subscribe/subject-subscribe.component';
import { AddSubjectComponent } from './subject-list/add-subject/add-subject.component';



@NgModule({
    declarations: [ListStudentComponent, SubjectListComponent, AddStudentComponent, SubjectSubscribeComponent, AddSubjectComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(StudentManagerRoutes),
        FuseNavigationModule,
        FuseShortcutsModule,
        FuseSearchBarModule,
        
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
    ],
    exports: [
    ],
    bootstrap: [
        
    ]
})
export class StudentManagerModule { }

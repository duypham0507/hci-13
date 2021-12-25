import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { FuseNavigationModule } from '@fuse/components/navigation/navigation.module';
import { FuseShortcutsModule } from '@fuse/components/shortcuts/shortcuts.module';
import { FuseSearchBarModule } from '@fuse/components/search-bar/search-bar.module';
import { InformationRoutes } from './information.routing.';
import { StudentInfoComponent } from './student-info/student-info.component';
import { SubjectJoinComponent } from './subject-join/subject-join.component';
import { SystemInfoComponent } from './system-info/system-info.component';
import { SubjectRegisterComponent } from './subject-join/subject-register/subject-register.component';


@NgModule({
    declarations: [StudentInfoComponent, SubjectJoinComponent, SystemInfoComponent, SubjectRegisterComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(InformationRoutes),
        FuseNavigationModule,
        FuseShortcutsModule,
        FuseSearchBarModule,
    ]
})
export class InformationModule { }

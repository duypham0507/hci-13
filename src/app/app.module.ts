import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
// import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { FuseSampleModule } from './main/content/sample/sample.module';
import { AuthenticationModule } from './main/authentication/authentication.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutes } from './app.routing';
import { Constants } from './shared/constants';
import { AuthenticationService } from './shared/services/AuthenticationService';
import { MatPaginatorIntlCro } from './shared/MatPaginatorIntlCro';
import { WaitingService } from './shared/services/waiting.service';
import { ConfigProvider, configProviderFactory } from './shared/config.provider';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { AuthGuard } from './shared/auth.guard';
import { ListStudentComponent } from './student-manager/student-list/list-student.component';
import { StudentManagerModule } from './student-manager/student-manager.module';





@NgModule({
    declarations: [
        AppComponent,
        
        
       
       
        //SigninComponent
    ],
    imports     : [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(AppRoutes),
        SharedModule,
        TranslateModule.forRoot(),
        FuseMainModule,
        FuseSampleModule,
        AuthenticationModule,
        MatInputModule,
        StudentManagerModule
    ],
    providers   : [
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro},
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService,
        AuthenticationService,
        WaitingService,
        ConfigProvider, 
        { provide: APP_INITIALIZER, useFactory: configProviderFactory, deps: [ConfigProvider], multi: true },
        AuthGuard
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
    
}

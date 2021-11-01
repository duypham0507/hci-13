import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FuseConfigService } from '../../core/services/config.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../shared/services/AuthenticationService';
import { Constants } from '../../shared/constants';
import { User } from '../../shared/models/user.model';
import { WaitingService } from '../../shared/services/waiting.service';
import { StudentService } from 'app/student-manager/service/student.service';

@Component({
    selector: 'fuse-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})

export class FuseToolbarComponent {
    userStatusOptions: any[];
    languages: any;
    selectedLanguage: any;
    showLoadingBar: boolean;
    showWaitingBar: boolean;
    horizontalNav: boolean;
    user: User;

    constructor(
        private router: Router,
        private fuseConfig: FuseConfigService,
        private translate: TranslateService,
        private authServ: AuthenticationService,
        private waitingService: WaitingService,
        private service: StudentService
    ) {
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon': 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon': 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon': 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                'id': 'vi',
                'title': 'Tiếng Việt',
                'flag': 'vi'
            },
            {
                'id': 'en',
                'title': 'English',
                'flag': 'us'
            },
            {
                'id': 'tr',
                'title': 'Turkish',
                'flag': 'tr'
            }
        ];

        this.selectedLanguage = this.languages[0];

        router.events.subscribe(
            (event) => {
                if (event instanceof NavigationStart) {
                    this.showLoadingBar = true;
                }
                if (event instanceof NavigationEnd) {
                    this.showLoadingBar = false;
                }
            });
        var me =  this;
        this.waitingService.onWaitingChange.subscribe((show) => {
            setTimeout(function () { me.showWaitingBar = show; }, 1);
        });

        this.fuseConfig.onSettingsChanged.subscribe((settings) => {
            this.horizontalNav = settings.layout.navigation === 'top';
        });
        // this.user = this.authServ.getCurrentUser();
        this.service.GetList().subscribe(info => {
            info.forEach(item => {
                let usr = localStorage.getItem("tnthvn_usr")
                if(item.username == usr) {
                    this.user = item;
                }
            })
        })
    }

    search(value) {
        // Do your search here...
        console.log(value);
    }

    setLanguage(lang) {
        // Set the selected language for toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this.translate.use(lang.id);
    }

    logout() {
        this.authServ.logout();
        this.router.navigate([
            Constants.Router_Login
        ]);
    }
}

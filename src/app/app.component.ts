import { Component, OnInit } from '@angular/core';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from './core/services/translation-loader.service';

import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { FuseNavigationModel } from './navigation/navigation.model';
import { locale as navigationVietnameses } from './navigation/i18n/vi';
import { locale as navigationEnglish } from './navigation/i18n/en';
import { locale as navigationTurkish } from './navigation/i18n/tr';
import { ConfigProvider } from './shared/config.provider';
import { Constants } from './shared/constants';

@Component({
    selector   : 'fuse-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
})
export class AppComponent implements OnInit
{
    constructor(
        private fuseNavigationService: FuseNavigationService,
        private fuseSplashScreen: FuseSplashScreenService,
        private translate: TranslateService,
        private translationLoader: FuseTranslationLoaderService,
        private configProvider: ConfigProvider)
    {
        Constants.setConfig(this.configProvider.getAllConfig());
        
        // Add languages
        this.translate.addLangs(['en', 'vi', 'tr']);

        // Set the navigation translations
        this.translationLoader.loadTranslations(navigationEnglish, navigationVietnameses, navigationTurkish);

        // Set the default language
        this.translate.setDefaultLang('vi');

        // Use a language
        this.translate.use('vi');

        // Set the navigation model
        this.fuseNavigationService.setNavigationModel(new FuseNavigationModel([]));
    }

    ngOnInit() {
    }
}

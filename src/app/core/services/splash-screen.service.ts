import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
declare var $ :any;

@Injectable()
export class FuseSplashScreenService
{
    splashScreenEl;
    public player: AnimationPlayer;

    constructor(
        private animationBuilder: AnimationBuilder,
        @Inject(DOCUMENT) private document: any,
        private router: Router
    )
    {
        this.splashScreenEl = this.document.body.querySelector('#fuse-splash-screen');

        const hideOnLoad = this.router.events.subscribe((event) => {
                if ( event instanceof NavigationEnd )
                {
                    setTimeout(() => {
                        this.hide();
                        hideOnLoad.unsubscribe();
                    }, 0);
                }
            }
        );
    }

    show(transparent: boolean = false)
    {
        let bgrColor = '#3C4252';
        let pointerEvent = 'none';
        let logoDiv = this.splashScreenEl.querySelector('.logo');
        $(logoDiv).show();

        if (transparent) {
            bgrColor = 'rgba(0, 0, 0, 0.5)';
            pointerEvent = 'unset';
            $(logoDiv).hide();
        }
        
        this.player =
            this.animationBuilder
                .build([
                    style({
                        opacity: '0',
                        zIndex : '99999',
                        'background-color': bgrColor,
                        'pointer-events': pointerEvent
                    }),
                    animate('400ms ease', style({opacity: '1'}))
                ]).create(this.splashScreenEl);

        setTimeout(() => {
            this.player.play();
        }, 0);
    }

    hide()
    {
        this.player =
            this.animationBuilder
                .build([
                    style({opacity: '1'}),
                    animate('400ms ease', style({
                        opacity: '0',
                        zIndex : '-10'
                    }))
                ]).create(this.splashScreenEl);

        setTimeout(() => {
            this.player.play();
        }, 0);
    }
}

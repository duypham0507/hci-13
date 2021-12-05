import { Component, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FuseNavigationService } from './navigation.service';
import { FuseNavigationModel } from '../../../navigation/navigation.model';
import { Subscription } from 'rxjs';
// import { FunctionService } from '../../../admin/function-manager/function-manager.service';
import { Router } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
    selector     : 'fuse-navigation',
    templateUrl  : './navigation.component.html',
    styleUrls    : ['./navigation.component.scss'],
    // providers: [FunctionService],
    encapsulation: ViewEncapsulation.None
})
export class FuseNavigationComponent implements OnDestroy, OnInit
{
    navigationModel: any[];
    navigationModelChangeSubscription: Subscription;

    @Input('layout') layout = 'vertical';
    @Input('module') module = 'admin';

    constructor(private fuseNavigationService: FuseNavigationService, 
        // private functionService: FunctionService,
        private router: Router
    )
    {
        this.navigationModelChangeSubscription =
            this.fuseNavigationService.onNavigationModelChange
                .subscribe((navigationModel) => {
                    this.navigationModel = navigationModel;
                });
        
                this.fuseNavigationService.setNavigationModel(new FuseNavigationModel([]));
        
        
        
    }

    ngOnInit() {
        //if (this.module == 'public') {
            // this.fuseNavigationService.setNavigationModel(FuseNavigationModel.getPublicModel());
        // } else {
        //     this.functionService.getMyMenu().then(rs => {
        //         this.fuseNavigationService.setNavigationModel(new FuseNavigationModel(rs));
        //     });
        // }
    }

    ngOnDestroy()
    {
        this.navigationModelChangeSubscription.unsubscribe();
    }

}

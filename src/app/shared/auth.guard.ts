import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from "./services/AuthenticationService";
import { Constants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenService: AuthenticationService
    ) { }

    async canActivate() {
        try {
            const x = await localStorage.getItem("tnthvn_usr")
            if (!x) {
                this.router.navigate([
                    Constants.Router_Login
                ]);
                return false;
            }
            return true;
        }
        catch (e) {
            this.router.navigate([
                Constants.Router_Login
            ]);
            return false;
        }
    }
}

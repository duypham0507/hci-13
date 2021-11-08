import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';


export interface ICspAuthenService {
    getAuthorization(): string;
}

@Injectable()
export class AuthenticationService implements ICspAuthenService {
    protected _isLoggedIn = false;
    protected key_access_token = 'access_token';
    protected key_refresh_token = 'refresh_token';
    protected key_token_expire_time = 'token_expire_time';
    protected key_current_user = 'usercontext';
    protected key_current_role = 'current_role';
    protected loginUrl = '';
    protected apiDomain = '';

    loggedIn: Subject<boolean>;

    constructor() {}

    getAuthorization(): string {
        return localStorage.getItem(this.key_access_token);
    }

    getAccessToken(): string {
        return localStorage.getItem(this.key_access_token);
    }

    getRefreshToken(): string {
        return localStorage.getItem(this.key_refresh_token);
    }

    logout() {
        this._isLoggedIn = false;
        this.loggedIn.next(this._isLoggedIn);
        localStorage.removeItem(this.key_access_token);
        localStorage.removeItem(this.key_current_user);
    }    


    handleError(error: any) {
        console.error('Có lỗi xảy ra', error);
        if (error.status === 401) {

        }
        return Promise.reject(error);
    }
}

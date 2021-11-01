import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { Constants } from '../constants';
import { User } from "../models/user.model";
import { ConfigProvider } from '../config.provider';

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

    constructor(
        private http: HttpClient,
        private configProvider: ConfigProvider
    ) {
        let apiDomain = this.configProvider.getConfig('Api_Domain');
        if (apiDomain == '' || apiDomain == '~/' || apiDomain == '/')
            apiDomain = document.location.protocol + "//" + document.location.host + "/";

        this.apiDomain = apiDomain;
        this.loginUrl = this.apiDomain + Constants.LoginUrl;

        if (this.loggedIn == null)
            this.loggedIn = new Subject<boolean>();
        this._isLoggedIn = !!localStorage.getItem(this.key_access_token);
        this.loggedIn.next(this._isLoggedIn);
    }

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

    async login(username: string, password: string) {
        try {
            const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
            let body = `username=${encodeURI(username)}&password=${encodeURI(password)}&client_id=${encodeURI(Constants.getConfig('ClientId'))}&client_secret=${encodeURI(Constants.getConfig('ClientSecret'))}&grant_type=password`;
            const response = await this.http.post<any>(this.loginUrl, body, { headers }).toPromise();
            let json = response as any;
            let now = new Date();
            now.setSeconds(now.getSeconds() + json.expires_in - 60);
            localStorage.setItem(this.key_access_token, json.access_token);
            localStorage.setItem(this.key_refresh_token, json.refresh_token);
            localStorage.setItem(this.key_token_expire_time, now.toISOString());
            localStorage.setItem(this.key_current_user, username);
            const profile = await this.getMyProfile();
            var isAdmin = profile.roles.indexOf('Admin') >= 0 || profile.roles.indexOf('RootAdmin') >= 0;
            localStorage.setItem(this.key_current_role, isAdmin ? 'Admin' : '');
            if (isAdmin) {
                this._isLoggedIn = true;
                this.loggedIn.next(this._isLoggedIn);
                return json.access_token;
            }
            else {
                return false;
            }
        }
        catch {
            return false;
        }
    }

    async refreshToken(): Promise<string> {
        try {
            const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
            let refreshToken = localStorage.getItem(this.key_refresh_token);
            let body = `refresh_token=${encodeURI(refreshToken)}&client_id=${encodeURI(Constants.getConfig('ClientId'))}&client_secret=${encodeURI(Constants.getConfig('ClientSecret'))}&grant_type=${encodeURI('refresh_token')}`;
            const json = await this.http.post<any>(this.loginUrl, body, { headers }).toPromise();
            let now = new Date();
            now.setSeconds(now.getSeconds() + json.expires_in - 60);
            localStorage.setItem(this.key_access_token, json.access_token);
            localStorage.setItem(this.key_refresh_token, json.refresh_token);
            localStorage.setItem(this.key_token_expire_time, now.toISOString());
            const profile = await this.getMyProfile();
            var isAdmin = profile.roles.indexOf('Admin') >= 0 || profile.roles.indexOf('RootAdmin') >= 0;
            localStorage.setItem(this.key_current_role, isAdmin ? 'Admin' : '');
            return localStorage.getItem(this.key_access_token);
        }
        catch {
            return null;
        }
    }

    getValidToken(): Promise<string> {
        let tokenExpireTime = new Date(localStorage.getItem(this.key_token_expire_time));
        let now = new Date();
        let curToken = localStorage.getItem(this.key_access_token);
        if (!curToken) {
            return Promise.resolve(null);
        }
        else if (tokenExpireTime > now) {
            return Promise.resolve(curToken);
        }
        else {
            return this.refreshToken();
        }
    }

    async isLoggedIn(): Promise<boolean> {
        const token = await this.getValidToken();
        let curRole = localStorage.getItem(this.key_current_role);
        if (token == undefined || token == null || token == '' || token == 'null' || curRole != 'Admin') {
            return false;
        }
        return true;
    }

    async getMyProfile(): Promise<any> {
        const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${localStorage.getItem(this.key_access_token)}` };
        let url = `${this.apiDomain}${Constants.ApiResources.User.Resource}/${Constants.ApiResources.User.GetMyProfile}`;
        return this.http.get(url, { headers }).toPromise();
    }

    getCurrentUser(): User {
        const currentUser = localStorage.getItem(this.key_current_user);
        const userContext: User = new User();

        if (currentUser && currentUser !== 'undefined')
            userContext.username = currentUser;
        return userContext;
    }

    handleError(error: any) {
        console.error('Có lỗi xảy ra', error);
        if (error.status === 401) {

        }
        return Promise.reject(error);
    }
}

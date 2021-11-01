import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injector } from "@angular/core";
import { Router } from "@angular/router";
import { BaseModel } from "../models/base.model";
import { Constants } from "../constants";
import { AuthenticationService } from "./AuthenticationService";
import { WaitingService } from "./waiting.service";
import { MatDialog } from "@angular/material/dialog";

export interface ICMSService<T extends BaseModel> {
    svUrl: string;
    get(params?: Object): Promise<ResponseResult>;
    getDetail(id: string): Promise<T>;
    save(item: T, itemId: string): Promise<ResponseResult>;
    post(item: T): Promise<ResponseResult>;
    put(item: T, itemId: string): Promise<ResponseResult>;
    delete(id: string): Promise<ResponseResult>;
    handleError(error: any, injector: Injector): any;
}

export interface ResponseResult extends BaseModel {
    status: boolean;
    message: string;
    error: string;
    data: any;
    totalRecord: number;
    results: any;
    code: number;
}

export class BaseService<T extends BaseModel> implements ICMSService<T> {
    svUrl: string;
    injector: Injector;
    http: HttpClient;
    waitingService: WaitingService;
    ignoreAuthorization: boolean = false;
    appId:string;

    constructor(private _http: HttpClient, svUrl: string, _injector: Injector) {

        let apiDomain = Constants.getConfig('Api_Domain');
        if (apiDomain == '' || apiDomain == '~/' || apiDomain == '/')
            apiDomain = document.location.protocol + "//" + document.location.host + "/";
        this.svUrl = apiDomain + svUrl;

        this.injector = _injector;
        this.http = _http;
        this.waitingService = this.injector.get(WaitingService);
        this.ignoreAuthorization = Constants.getConfig('ignoreAuthorization');

    }

    get(params?: any, page?: number, limit?: number): Promise<any> {        
        let headers: HttpHeaders = new HttpHeaders();
        let url = this.svUrl;
        let xLimit = limit ? limit : 20;
        let skip = ((page ? page : 1) - 1) * xLimit;
        url += `?$skip=${skip}&$top=${xLimit}`;

        if (params && Object.keys(params).length > 0) {
            for (const key of Object.keys(params)) {
                url += `&${key}=${encodeURIComponent(params[key])}`;
            }
        }

        return this.httpGet(url, { headers: headers })
            .then(response => {
                return response;
            },
            err => { throw err });
    }

    async getAsync(params?: any, page?: number, limit?: number): Promise<any> {        
        let headers: HttpHeaders = new HttpHeaders();
        let url = this.svUrl;
        let xLimit = limit ? limit : 20;
        let skip = ((page ? page : 1) - 1) * xLimit;
        url += `?$skip=${skip}&$top=${xLimit}`;

        if (params && Object.keys(params).length > 0) {
            for (const key of Object.keys(params)) {
                url += `&${key}=${encodeURIComponent(params[key])}`;
            }
        }

        return await this.httpGet(url, { headers: headers })
            .then(response => {
                return response;
            },
            err => { throw err });
    }

    getDetail(id: string): Promise<any> {
        let headers = new HttpHeaders();
        let url = `${this.svUrl}/${id}`;

        return this.httpGet(url, { headers: headers })
            .then(response => {
                return response;
            },
            err => { throw err });
    }

    save(item: T, itemId: string): Promise<ResponseResult> {
        if (itemId) {
            return this.put(item, itemId);
        }
        return this.post(item);
    }

    post(item: T): Promise<any> {
        let headers = new HttpHeaders();
        item["id"] = undefined;

        return this.httpPost(this.svUrl, item, { headers: headers })
            .then(response => {
                return response;
            },
            err => { throw err });
    }

    put(item: T, itemId: string): Promise<any> {
        let headers = new HttpHeaders();
        let url = `${this.svUrl}`;

        return this.httpPut(url, item, { headers: headers })
            .then(response => {
                return response;
            },
            err => { throw err });
    }

    delete(id: string): Promise<any> {
        let headers = new HttpHeaders();
        let url = `${this.svUrl}/${id}`;

        return this.httpDelete(url, { headers: headers });
    }

    public changeStatus(id: string, status: number): Promise<any> {
        let headers = new HttpHeaders();
        let url = `${this.svUrl}/${id}/changestatus`;

        return this.httpPost(url, { status : status }, { headers: headers });
    }

    handleError(error: any, injector: Injector, waitingId: string = undefined, isLoadingBar: boolean = false) {
        if (!error.proceeded) {
            console.error('Có lỗi xảy ra', error);
            if (error.status == 401) {
                this.injector.get(MatDialog).closeAll();
                var authen: AuthenticationService = injector.get(AuthenticationService);
                var router: Router = injector.get(Router);
                authen.logout();
                router.navigate([Constants.Router_Login]);
            }
        }
        
        isLoadingBar ? this.waitingService.stopWaitingBar(waitingId) : this.waitingService.stopWaiting(waitingId);
        error.proceeded = true;
        return error;
    }

    async addAuthorizationAsync(headers: HttpHeaders, hasContentType: boolean = true) {
        let authen: AuthenticationService;
        authen = this.injector.get(AuthenticationService);

        if (!this.ignoreAuthorization) {
            var token = await authen.getValidToken();
            if (token == undefined || token == null || token == '' || token == 'null') {
                this.injector.get(MatDialog).closeAll();
                var router: Router = this.injector.get(Router);
                router.navigate([Constants.Router_Login]);
                throw "Unauthorized";
            }
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        
        if (hasContentType)
            headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return headers;
    }

    isLoggedIn(): boolean {
        let authen = this.injector.get(AuthenticationService);
        let token = authen.getAuthorization();

        if (token == undefined || token == null || token == '' || token == 'null') {
            return false;
        }

        return true;
    }

    async httpGet(url: string, options?: any, showWaiting: boolean = true): Promise<any> {   
        options = options ? options : {};
        let headers = options.headers ? options.headers : new HttpHeaders();
        options.headers = await this.addAuthorizationAsync(headers); 
        let waitingId = showWaiting ? this.waitingService.startWaitingBar() : 'no-waiting';
        return this._http.get(url, options).toPromise()
        .then(response => {
            this.waitingService.stopWaitingBar(waitingId);
            return response;
        })
        .catch(error => {
            throw this.handleError(error, this.injector, waitingId, true);
        });
    }

    async httpPost(url: string, body: any, options?: any, showWaiting: boolean = true, hasContentType: boolean = true): Promise<any> {
        options = options ? options : {};
        let headers = options.headers ? options.headers : new HttpHeaders();
        options.headers = await this.addAuthorizationAsync(headers, hasContentType); 
        let waitingId = showWaiting ? this.waitingService.startWaiting() : 'no-waiting';
        return this._http.post(url, body, options)
            .toPromise()
            .then(response => {
                this.waitingService.stopWaiting(waitingId);
                return response;
            })
            .catch(error => {
                throw this.handleError(error, this.injector, waitingId, false);
            });
    }

    async httpPut(url: string, body: any, options?: any, showWaiting: boolean = true): Promise<any> {
        options = options ? options : {};
        let headers = options.headers ? options.headers : new HttpHeaders();
        options.headers = await this.addAuthorizationAsync(headers); 
        let waitingId = showWaiting ? this.waitingService.startWaiting() : 'no-waiting';

        return this._http.put(url, body, options)
            .toPromise()
            .then(response => {
                this.waitingService.stopWaiting(waitingId);
                return response;
            })
            .catch(error => {
                throw this.handleError(error, this.injector, waitingId, false);
            });
    }

    async httpDelete(url: string, options?: any, showWaiting: boolean = true): Promise<any> {
        options = options ? options : {};
        let headers = options.headers ? options.headers : new HttpHeaders();
        options.headers = await this.addAuthorizationAsync(headers); 
        let waitingId = showWaiting ? this.waitingService.startWaiting() : 'no-waiting';
        
        return this._http.delete(url, options)
            .toPromise()
            .then(response => {
                this.waitingService.stopWaiting(waitingId);
                return response;
            })
            .catch(error => {
                throw this.handleError(error, this.injector, waitingId, false);
            });
    }    
}

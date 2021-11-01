import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable()
export class ConfigProvider {
    public static _config = environment;
    private config: any = {};

    constructor(private http: HttpClient) {

    }

    public getAllConfig(): any {
        return this.config;
    }

    public getConfig(key: string): any {
        return this.config[key];
    }

    load() {
        return new Promise((resolve, reject) => {
            this.http
                .get(ConfigProvider._config.ConfigFileUrl)
                .map(res => res
                    
                )
                .subscribe(response => {
                    this.config = response;
                    resolve(true);
                })
        })
    }
}

export function configProviderFactory(provider: ConfigProvider) {
    return () => provider.load();
}
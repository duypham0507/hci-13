import { environment } from '../../environments/environment';

export class Constants {
    public static Router_Login = "/authentication/login";
    
    
    private static _config: any = environment;
    public static setConfig(json) {
        Constants._config = json;
    }

    public static getConfig(key) {
        return Constants._config[key];
    }

    
}

import { environment } from '../../environments/environment';

export class Constants {
    public static Router_Login = "/authentication/login";
    public static LoginUrl = "sts/getaccesstoken";
    
    private static _config: any = environment;
    public static setConfig(json) {
        Constants._config = json;
    }

    public static getConfig(key) {
        return Constants._config[key];
    }

    public static ApiResources = {
        Role: {
            Resource: 'smt/api/roles'
        },
        Menu: {
            Resource: 'smt/api/usermenus'
        },
        User: {
            Resource: 'smt/api/users',
            GetMyProfile: 'getMyProfile',
        },
        Function: {
            Resource: 'smt/api/functions'
        },
        Application: {
            Resource: 'smt/api/applications'
        },
        Action: {
            Resource: 'smt/api/useractions'
        },
        SystemConfig: {
            Resource: 'smt/api/systemconfigs',
            UpdateValues: 'UpdateValues'
        },
        UploadFile: {
            Resource: 'fs/uploads'
        }
    }

    public static IdentityResources = {
        Identity: {
            Resource: 'smt/api/identityresources'
        },
        ApiResources: {
            Resource: 'smt/api/apiresources'
        }
    }
}

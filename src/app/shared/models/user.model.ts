import { JsonObject, JsonProperty} from "json2typescript";
import { DateConverter } from "../jsonCustomConverter";
import { BaseModel } from './base.model';

// @JsonObject
export class User {
  @JsonProperty("objectId", String)
  objectId: String = undefined;

  @JsonProperty("createdAt", DateConverter)
  createdAt?: Date = undefined;

  @JsonProperty("updatedAt", DateConverter)
  updatedAt?: Date = undefined;

  @JsonProperty("name", String)
  name: String = undefined;

  @JsonProperty("userName", String)
  username: String = undefined;
}

// @JsonObject
export class UserExt extends BaseModel {
  @JsonProperty("userType", String)
  userType: String = undefined;

  @JsonProperty("extObjectId", String)
  extObjectId: String = undefined;

  @JsonProperty("user", User)
  user: String = null;
}

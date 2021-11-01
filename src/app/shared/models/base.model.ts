import { User } from './user.model';
import { DateConverter } from '../jsonCustomConverter';
import {JsonObject, JsonProperty} from 'json2typescript';

// @JsonObject
export class BaseModel {
  @JsonProperty('objectId', String)
  objectId: String = undefined;

  @JsonProperty('createdAt', DateConverter)
  createdAt?: Date = undefined;

  @JsonProperty('updatedAt', DateConverter)
  updatedAt?: Date = undefined;

  // @JsonProperty("createdBy", User)
  createdBy?: User = undefined;

  // @JsonProperty("updatedBy", User)
  updatedBy?: User = undefined;

  totalRows?: number;
}

export interface IBaseModel {
    objectId: string;
    totalRows?: number;
    createdBy?: User;
    updatedBy?: User;
    getClassName(): String;
    setLocalObject();
}

import {Response} from "express"
export interface AuthResponse extends Response{
  user?:UserPayloadPublic
}
export type UserPayloadPublic={
    name:string;
    email:string;
    // username:string;
}

export type UserPayloadPrivate = UserPayloadPublic & {
  id:number;
};
import { RoleEntity } from "../entities/role.entity";
export interface UserInfoModel {
    id?: Number,
    is_delete?: boolean,
    created_date?: Date,
    modified_date?: Date,
    username: string,
    address: string,
    balance: Number,
    image?: string | null,
    background?: string | null,
    roleID: number
   
}
export interface UpdateUserModel {
    element:Attribute
}

export interface Attribute {
    name: string;
    value: string | number;
}
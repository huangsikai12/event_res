export class Activity{
    "id":number;
    "title":string;
    "time":string;
    "description":string;
    "joinCount":number;
    "totalCount":number;
    "place":string;
    "status":number;
    "signPwd":string;
    "userStatus":number

}
export interface User
{
    id:number;
    name:string;
    uid:string
    phone:string;
    pwd:string;
    roleId:number;
}
export interface JoinedInfo
{
    id:number;
    uid:number;
    eid:number;
    status:number;
}
export interface DateTimePickerValue
{
    selectedValues:Array<string>;
}
export interface SelectedOptionsInter
{
    selectedOptions:Array<GeneralOptionsInter>;
}
export interface GeneralOptionsInter
{
    text:string,
    values:string,
}
export class Activity{
    "id":string;
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
export class User
{
    "id":number;
    "name":string;
    "uid":string;
    "phone":string;
    "pwd":string;
    "roleId":number;
    "token":string;
}
export interface JoinedInfo
{
    id:number;
    uid:string;
    eid:string;
    status:number;
    title:string;
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
    value:string,
}
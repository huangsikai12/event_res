export interface Activity{
    id:number;
    title:string;
    time:string;
    description:string;
    joinCount:number;
    totalCount:number;
    place:string;
    status:number,
    signPwd:string,

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
    event_id:number;
    status:number;
}
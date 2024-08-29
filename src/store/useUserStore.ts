import { defineStore } from 'pinia'
import {ref} from "vue";
import {User}from "../interface/DataInterface.ts";


// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id

export const useUserStore = defineStore("user",()=>{
    const user = ref<User>({name: "", uid: "", id: 0, phone: "", pwd: "", roleId: 0}) //全局可用

    const changeUser = (value:User)=>{
        user.value = value
    }
    const clearUser = ()=>{
            user.value = {name: "", uid: "", id: 0, phone: "", pwd: "", roleId: 0}
    }

    return {
        user,
        changeUser,
        clearUser
    }

}
,
    {
        persist:true
    })
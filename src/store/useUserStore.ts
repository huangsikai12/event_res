import { defineStore } from 'pinia'
import {ref} from "vue";
import {User}from "../interface/DataInterface.ts";
import {jwtDecode} from "jwt-decode";



export const useUserStore = defineStore("user",()=>{
    const userToken = ref<string>(localStorage.getItem("token")??"")
    const changeUser = (value:User)=>{
        userToken.value = value.token
    }

    const setUserToken = (value:string)=>{
        userToken.value = value
    }
    const clearUser = ()=>{
        localStorage.clear()
    }
    const parseUser =()=>
    {
        let user_json:string|undefined = ""
        try {
           user_json = jwtDecode(userToken.value).sub;
        } catch (e) {
            user_json = JSON.stringify(new User())

        }
        if (user_json!=undefined)
        {
            return JSON.parse(user_json)
        }
    }
    return {
        userToken,
        changeUser,
        clearUser,
        parseUser,
        setUserToken
    }

}
,
    {
        persist:true
    })
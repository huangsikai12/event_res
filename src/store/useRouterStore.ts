
import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useRouterStore = defineStore("router",()=>{
    const isGetterRouter = ref(false) //全局可用

    const changeRouter = (value:boolean)=>{
        isGetterRouter.value = value
    }

    return {
        isGetterRouter,
        changeRouter
    }
})
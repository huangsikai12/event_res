import { createRouter, createWebHashHistory} from 'vue-router'
import Login from "../components/Login.vue";
import MainBox from "../components/MainBox.vue";
import {useUserStore} from "../store/useUserStore.ts";
import NoLoginSignActivity from "../components/NoLoginSignActivity.vue";
import Register from "../components/Register.vue";
import {showSuccessToast} from "vant";
import EmailLogin from "../components/EmailLogin.vue";

const routes = [
    { path: '/', component: Login },
    { path: '/main', component: MainBox },
    { path: '/noLoginSign', component: NoLoginSignActivity },
    { path: '/register', component: Register },
    { path: '/emailLogin', component: EmailLogin },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next)=>{
    //
    const {parseUser} = useUserStore()
    const user = parseUser()

    if (from.path == "/main" && to.path=="/")
    {
        showSuccessToast("您已退出登录")
        useUserStore().clearUser()
        localStorage.clear()
    }
    // const { isGetterRouter } = useRouterStore()
    if (to.path == "/" || to.path==="/noLoginSign" || to.path==="/register"  || to.path==="/emailLogin")
    {
        next()
    }else
    {



        if (user.id ==undefined){
            next({
                path:"/"
            })
        }
        else
        {
            next()
        }
    }

})
import { createRouter, createWebHashHistory} from 'vue-router'
import Login from "../components/Login.vue";
import MainBox from "../components/MainBox.vue";
import {useUserStore} from "../store/useUserStore.ts";
import NoLoginSignActivity from "../components/NoLoginSignActivity.vue";



const routes = [
    { path: '/', component: Login },
    { path: '/main', component: MainBox },
    { path: '/noLoginSign', component: NoLoginSignActivity },
    { path: '/register', component: NoLoginSignActivity },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next)=>{
    //
    from
    // const { isGetterRouter } = useRouterStore()
    const {user} = useUserStore()
    if (to.path === "/" || to.path==="/noLoginSign " || to.path==="/register")
    {
        next()
    }else
    {
        if (user.id === 0){
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
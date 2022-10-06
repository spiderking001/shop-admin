import {createRouter, createWebHashHistory} from "vue-router";
import Index from "../views/Index.vue";

const routes = [
    {
        path: '/', component: Index,meta:{title:'后台首页'}
    },
    {
        path: '/login', component: () => import("../views/Login.vue"),meta:{title:'登陆页'}
    },
    {
        path: '/:pathMatch(.*)*', component: () => import("../views/404.vue")
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
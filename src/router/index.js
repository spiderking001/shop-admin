import {createRouter, createWebHashHistory} from "vue-router";
import Index from "../views/Index.vue";

const routes = [
    {
        path: '/', component: Index
    }, {
        path: '/login', component: () => import("../views/Login.vue")
    }, {
        path: '/:pathMatch(.*)*', component: () => import("../views/404.vue")
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
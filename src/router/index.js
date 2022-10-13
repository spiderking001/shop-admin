import {createRouter, createWebHashHistory} from "vue-router";
import Index from "../views/Index.vue";
import Admin from "../layouts/Admin.vue";


//默认路由,所有用户共享
const routes = [
    {
        path: '/',
        name: "admin",
        component: Admin,
    },

    {
        path: '/login', component: () => import("../views/Login.vue"), meta: {title: '登陆页'}
    },
    {
        path: '/:pathMatch(.*)*', component: () => import("../views/404.vue")
    },
]

//动态路由,用域动态匹配添加路由
const asyncRoutes = [
    {
        path: '/',
        name:"/",
        component: Index,
        meta: {title: '后台首页'},
    },
    {
        path: '/goods/list',
        name:"/goods/list",
        component: () => import ('../views/goods/List.vue'),
        meta: {title: '商品管理'},
    },
    {
        path: '/category/list',
        name:"/category/list",
        component: () => import ('../views/category/List.vue'),
        meta: {title: '分类列表'},
    },
    {
        path: '/user/list',
        name:"/user/list",
        component: () => import ('../views/user/list.vue'),
        meta: {title: '用户列表'},
    },
    {
        path: '/order/list',
        name:"/order/list",
        component: () => import ('../views/order/list.vue'),
        meta: {title: '订单列表'},
    },
    {
        path: '/comment/list',
        name:"/comment/list",
        component: () => import ('../views/comment/list.vue'),
        meta: {title: '评价列表'},
    },
    {
        path: '/image/list',
        name:"/image/list",
        component: () => import ('../views/image/list.vue'),
        meta: {title: '图库列表'},
    },
    {
        path: '/notice/list',
        name:"/notice/list",
        component: () => import ('../views/notice/list.vue'),
        meta: {title: '公告列表'},
    },
    {
        path: '/setting/base',
        name:"/setting/base",
        component: () => import ('../views/setting/base.vue'),
        meta: {title: '配置列表'},
    },
    {
        path: '/coupon/list',
        name:"/coupon/list",
        component: () => import ('../views/coupon/list.vue'),
        meta: {title: '优惠券列表'},
    },
    {
        path: '/manager/list',
        name:"/manager/list",
        component: () => import ('../views/manager/list.vue'),
        meta: {title: '管理员管理'},
    },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//动态添加路由
export function addRoutes(menus){
    //是否有新路由
    let hasNewRoutes=false
    const findRoute = (arr) => {
        arr.forEach(e => {
            let item=asyncRoutes.find(i=>i.path===e.frontpath)
            if (item&&!router.hasRoute(item.path)){
                router.addRoute("admin",item)
                hasNewRoutes=true
            }
            if (e.child && e.child.length>0){
                findRoute(e.child)
            }
        })
    }
    findRoute(menus)
    // console.log(router.getRoutes())
    return hasNewRoutes
}
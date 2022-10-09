import {router,addRoutes} from './router'
import {getToken} from '@/composables/auth'
import {toast,showLoading,hideLoading} from '@/composables/util'
import store from './store'


// 全局前置守卫
let hasGetUserInfo = false
router.beforeEach(async (to, from, next) => {
    // to and from are both route objects. must call `next`.
    // console.log(to,from)

    //显示loading
    showLoading()
    const token = getToken()
    //没有登录,强制跳转到登陆页面
    if (!token && to.path !== '/login') {
        toast("请先登陆", "error")
        return next({
            path: '/login'
        })
    }

    //防止重复登陆
    if (token && to.path == '/login') {
        toast("请务重复登陆", "error")
        return next({
            path: from.path?from.path:'/'
        })
    }

    //如果用户登陆了,自动获取用户信息,并自动存到vuex中
    let hasNewRoutes=false
    if(token&& !hasGetUserInfo){
         let {menus}=await store.dispatch('getInfo')
        hasGetUserInfo=true
        //动态添加路由
        hasNewRoutes= addRoutes(menus)

    }

    //设置页面标题
    let title=(to.meta.title?to.meta.title:'后台管理系统')
    document.title=title
    hasNewRoutes?next(to.fullPath):next()
})

//全局后置守卫
router.afterEach((to, from) => {
    hideLoading()
})
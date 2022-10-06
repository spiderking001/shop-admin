import router from './router'
import {getToken} from '@/composables/auth'
import {toast} from '@/composables/util'
import store from './store'

// 路由守卫
router.beforeEach(async (to, from, next) => {
    // to and from are both route objects. must call `next`.
    // console.log(to,from)
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

    if(token){
         await store.dispatch('getInfo')
    }
    next()
})

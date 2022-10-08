import {createStore} from "vuex";
import {login, getInfo} from "@/api/manager";
import {setToken,removeToken} from "@/composables/auth";


// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            //用户信息
            user: {},

            //我的头像
            myImg:"https://avatars.githubusercontent.com/u/105508563?s=400&u=b8a77a6c0285e44f0d99291836f82d55dfda57af&v=4",

            //侧边宽度
            asideWidth:"250px",

            menus:[],
            ruleNames:[],

        }
    },
    mutations: {
        //设置用户信息
        setUserInfo(state, user) {
            state.user = user
        },

        //展开/收起侧边
        handleAside(state){
            state.asideWidth= state.asideWidth === "250px" ? "64px" : "250px"
        },

        setMenus(state,menus){
            state.menus=menus
        },
        setRuleNames(state,ruleNames){
            state.ruleNames=ruleNames
        }
    },
    actions: {
        //登录
        login({commit},{username,password}){
            return new Promise((resolve, reject) => {
                login(username,password).then(res => {
                    setToken(res.token)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //获取当前用户登录信息
        getInfo({commit}) {
            return new Promise((resolve, reject) => {
                getInfo().then((res) => {
                    commit('setUserInfo', res)
                    commit('setMenus',res.menus)
                    commit('setRuleNames',res.ruleNames)
                    resolve(res)

                }).catch((error) => {reject(error)})
            })
        },

        //退出登录
        logout({commit}) {
            removeToken()
            commit('setUserInfo', {})
        }
    }
})

export default store
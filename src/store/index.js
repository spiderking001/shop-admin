import {createStore} from "vuex";
import {login, getInfo} from "@/api/manager";
import {setToken} from "@/composables/auth";


// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            //用户信息
            user: {}
        }
    },
    mutations: {
        //设置用户信息
        setUserInfo(state, user) {
            state.user = user
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
                    resolve(res)
                }).catch((error) => {
                    reject(error)
                })
            })
        }
    }
})

export default store
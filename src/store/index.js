import {createStore} from "vuex";


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
    }
})

export default store
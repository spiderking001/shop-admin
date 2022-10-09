import {ref} from 'vue'
import {useRoute, onBeforeRouteUpdate, useRouter} from 'vue-router'
import {useCookies} from '@vueuse/integrations/useCookies'

export function useTabList (){
    const route = useRoute()
    const router = useRouter()
    const cookie = useCookies()

        const activeTab = ref(route.path)
    const tabList = ref([
        {
            title: '后台首页',
            path: '/'
        }
    ])


//添加标签导航
    function addTab(tab) {
        let noTab = tabList.value.findIndex(item => item.path === tab.path) === -1
        if (noTab) {
            tabList.value.push(tab)
        }
        cookie.set("tabList", tabList.value)
    }

// 初始化标签导航列表
    function initTabList() {
        let tbs = cookie.get("tabList")
        if (tbs) {
            tabList.value = tbs
        }
    }

    initTabList()


    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path
        addTab({
            title: to.meta.title,
            path: to.path
        })


    })

//点击标签跳转
    const changeTab = (path) => {
        // console.log(path)
        activeTab.value = path
        router.push(path)
    }

    const removeTab = (t) => {
        let tabs = tabList.value
        let a = activeTab.value
        if (a === t) {
            tabs.forEach((tab, index) => {
                if (tab.path === t) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        a = nextTab.path
                        // router.push(nextTab.path)
                    }
                }
            })
        }
        activeTab.value = a
        tabList.value = tabs.filter(tab => tab.path !== t)

        //更新存储
        cookie.set("tabList", tabList.value)
    }

    const handleClose=(command)=>{
        if (command==="clearAll"){
            activeTab.value="/"
            tabList.value=[
                {
                    title:'后台首页',
                    path:'/'
                }]
        }else if(command==="clearOther"){
            tabList.value=tabList.value.filter(tab=>tab.path==="/"||tab.path===activeTab.value)

        }
        //更新存储
        cookie.set("tabList", tabList.value)
    }

    return{
            activeTab,
            tabList,
            changeTab,
            removeTab,
            handleClose

    }
}

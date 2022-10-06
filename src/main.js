import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import "nprogress/nprogress.css"

import 'virtual:windi.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
import "./permission"

app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.use(router)
app.use(store)

app.mount('#app')

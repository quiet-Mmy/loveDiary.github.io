import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

// 引入element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/icon/iconfont.css'
import 'nprogress/nprogress.css';
import './themes/common.scss'//引入全局scss

// 注册全局容器
import basicContainer from "./components/basic-container/main.vue";

const app = createApp(App)
const store = createPinia()
store.use(piniaPluginPersist)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component("basicContainer", basicContainer);//注册全局容器
app.use(router)
app.use(store)
app.use(ElementPlus)

app.mount('#app')

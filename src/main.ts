import {Component, createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'echarts'
import ECharts from "vue-echarts";
import 'default-passive-events'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app=createApp(App)
app.use(router)
app.use(ElementPlus).use(require('vue-cookies'))
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, <Component>component)
}
app.component('EC',ECharts)
app.mount('#app')

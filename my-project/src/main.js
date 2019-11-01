import Vue from 'vue'
import App from './App'
import Fly from 'flyio/dist/npm/wx'

Vue.config.productionTip = false

App.mpType = 'app'

//运用flyIo框架
let fly = new Fly
Vue.prototype.$fly = fly
//实例化VUE
const app = new Vue(App)
app.$mount()
//挂在全局变量必须放在app.$mount()后面
Vue.prototype.globalData = getApp().globalData
//挂在全局头部
Vue.prototype.$fly.interceptors.request.use((config, promise) => {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    return config;
})
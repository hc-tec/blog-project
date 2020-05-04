import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入Element-ui 组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入 axios 组件
import vueAxios from "vue-axios"
import axios from 'axios'
// 获取用户信息
import user_info from "./getUserInfo"

// 使用 user_info
Vue.use(user_info)
//使用Element UI组件
Vue.use(ElementUI)
//使用 axiox 组件
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.use(vueAxios, axios)
Vue.config.productionTip = false


//全局函数，用于动态注册组件
Vue.prototype.install = function(componName, componSite){
  Vue.component(componName, componSite)
}

Vue.prototype.notify = function(title, msg, type) {
  this.$notify({
    title: title,
    message: msg,
    type: type
  });
}

Vue.prototype.ajax = function(url, params={}, resolve, reject){
  axios.get(url, {params:params})
    .then(response => resolve(response.data))
    .catch(e => reject(e))
}

Vue.prototype.post = function(url, data, resolve, reject){
  axios.post(url, data)
    .then(response => resolve(response.data))
    .catch(e => reject(e))
}

router.afterEach(() => {
  window.scrollTo(0, 0)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

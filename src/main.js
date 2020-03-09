import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入Element-ui 组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入 axios 组件
import vueAxios from "vue-axios"
import axios from 'axios'

//使用Element UI组件
Vue.use(ElementUI)
//使用 axiox 组件
Vue.use(vueAxios, axios)
Vue.config.productionTip = false

//全局函数，用于动态注册组件
Vue.prototype.install = function(componName, componSite){
  Vue.component(componName, componSite)
}



router.afterEach(() => {
  window.scrollTo(0, 0)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

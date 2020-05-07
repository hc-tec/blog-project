import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入Element-ui 组件
import { MessageBox,
         Message,
         Notification,
         Icon } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入 axios 组件
import vueAxios from "vue-axios"
import axios from 'axios'
// 获取用户信息
import user_info from "./global"

Vue.config.productionTip = false

// 使用 user_info
Vue.use(user_info)
Vue.prototype.global = user_info;
//使用 axiox 组件
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.use(vueAxios, axios)

//使用Element UI组件
Vue.use(Icon)

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.prototype.fileArticle = null

// 每次更换页面，视图自动滚动到顶部
router.afterEach(() => {
  window.scrollTo(0, 0)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

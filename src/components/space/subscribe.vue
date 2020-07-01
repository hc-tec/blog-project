<template>
  <div class="user-space-subscribe">
    <p><i class="fa fa-star"></i> 博文订阅</p>
    <neu-switch
      v-model="isSubscribe"
      :disabled="!this.getUserInfo.power.isLogin"
      @change="subscribe"></neu-switch>
  </div>
</template>

<script>
import MessageBox from '../../MessageBox'
import { ajaxGet, postMsg, ajaxDel } from '../../elem_compo_encap'
import { SUBSCRIPT } from '../../api'
import { genericError } from '../../func'
export default {
  data () {
    return {
      isSubscribe: this.getUserInfo.uisSubscribe
    }
  },
  methods: {
    subscribe () {
      // 此时 isSubscribe 已经改变为相反情况，change 事件触发的特殊性
      // isSubscribe 为 true 说明之前没有订阅
      const reject = () => {
        this.isSubscribe = !this.isSubscribe;
      }
      if (this.isSubscribe) {
        let request = () => {
          ajaxGet(
            SUBSCRIPT, {email: `${this.getUserInfo.uqq}@qq.com`},
            response, reject
          )
        }
        let response = (res) => {
          if(res.data.code === 299) postMsg('订阅成功', 'success')
          else postMsg('订阅失败', 'danger')
        }
        let config = {
          title: '订阅框框',
          message: '确认订阅博文吗？您将在有新文章创建时收到邮箱提示。(若未收到，可查看垃圾邮箱)',
          confirmBtnText: '订阅',
          resolve: request,
          reject: reject
        }
        MessageBox.confirm(config)
      } else {
        let request = () => {
          ajaxDel(
            SUBSCRIPT, {email: `${this.getUserInfo.uqq}@qq.com`},
            response, reject
          )
        }
        let response = (res) => {
          if(res.data.code === 241) postMsg('成功取消订阅', 'success')
          else postMsg('取消订阅失败', 'danger')
        }
        let config = {
          title: '订阅框框',
          message: '确认取消订阅博文吗？您将不会收到邮箱提示。',
          confirmBtnText: '确认取消订阅',
          cancelBtnText: '在考虑下⑧',
          resolve: request,
          reject: reject
        }
        MessageBox.confirm(config)
      }
    }
  }
}
</script>

<style>
.user-space-subscribe {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.user-space-subscribe .fa {
  color: var(--second-color) !important;
}
</style>

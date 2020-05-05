<template>
  <div id="app">
    <pageHead :navList=navList />
    <transition :name="transitionName">
        <router-view />
    </transition>
    <transition :name="transitionName">
      <pageFoot />
    </transition>
    <transition :name="transitionName">
      <backTop />
    </transition>
  </div>
</template>

<script>

import pageHead from './components/Header'
import pageFoot from './components/footer'
import backTop from './components/backToTop'
import { ajaxGet, ajaxPost } from './elem_compo_encap'
export default {
  data(){
    return {
      //Header组件数据
      transitionName: "",
      navList: this.navList,
    }
  },
  methods: {
    getIP: function(){
      ajaxGet(
        "http://47.115.147.39/get_IP.php", {},
        ()=>{}, ()=>{}
      )
    },
    getCookie: (name) => {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    autoLogin: function() {
      let token = this.getCookie('token');
      if(token){
        let data = {
          token: token
        }
        ajaxPost(
          `http://${this.host}/api/autoLogin`, data,
          this.succAutoLogin, ()=>{}
        )
      }
    },
    succAutoLogin: function(res){
      let code = res.data['code'];
      let msg = res.data['msg'];
      let info = 'error';
      //状态码 270 表示登录成功
      if(270 == code){
        info = 'success';
        let user_info = res.data['data'][0];
        // 读取信息
        this.getUserInfo.uid = user_info['id'];
        this.getUserInfo.uuser_name = user_info['user_name'];
        this.getUserInfo.ugender = user_info['gender'];
        this.getUserInfo.uqq = user_info['qq'];
        this.getUserInfo.uavatar = user_info['avatar'];
        this.getUserInfo.friend_card = user_info['friend_card'];
        this.getUserInfo.uhobby = user_info['hobby'];
        this.getUserInfo.ugithub = user_info['github'];
        this.getUserInfo.uprofile = user_info['profile'];
        this.getUserInfo.uisSubscribe = user_info['isSubscribe'];
        this.getUserInfo.uregis_time = user_info['regis_time'];
        this.getUserInfo.uarticle_num = user_info['article_num'];


        this.getUserInfo.power.isLogin = true;
        // 获取用户类型
        if("超级管理员" === user_info['user_type']){
          // 获取所有权限
          this.getUserInfo.user_name = user_info['user_name'];
          Object.keys(this.getUserInfo.power).forEach(el => {
            this.$set(this.getUserInfo.power, el, true);
          })
        }
      }
    }
  },
  mounted(){
    this.getIP();
    this.autoLogin();
  },
  components: {
    pageHead,
    pageFoot,
    backTop,
  },
  watch: {
    $route(to, from) {
      if(to.meta.index > from.meta.index){
        this.transitionName = "slide-left";
      } else if (to.meta.index <= from.meta.index) {
        this.transitionName = "slide-right";
      }
    },
  },
}
</script>

<style scoped>
#nav a.router-link-exact-active {
  color: #42b983;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all .5s;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
</style>

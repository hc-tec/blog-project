<template>
  <div id="login-horizon">
    <div v-if="!isLogin" id="unLogin">
      <el-link
        type="primary"
        icon='el-icon-lollipop'
        @click="gotologin">登录</el-link>
    </div>
    <div v-else id="login">

      <el-link
        type="primary"
        icon="el-icon-user"
        @click="gotoAbout">
        {{this.getUserInfo.uuser_name}}
      </el-link>
      <el-link
        type="danger"
        icon="el-icon-s-release"
        @click="logout">注销
      </el-link>
    </div>
  </div>
</template>

<script>
import {Link} from 'element-ui';
export default {
  components: {
    "el-link": Link
  },
  data(){
    return {
      isLogin: this.getUserInfo.power.isLogin
    }
  },
  methods: {
    gotoAbout: function(){
      this.$router.push('/about');
    },
    gotologin: function(){
      this.$router.push('/login');
    },
    getCookie: (name) => {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    delCookie: function(name){
        let exp = new Date();
        exp.setTime(exp.getTime() - 1000 * 60 * 60 * 24 * 30);
        let cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
    },
    logout: function(){
      // 清楚 cookie 中的 token
      this.delCookie('token');
      // 退出登录状态
      this.isLogin = false;
      // 退出登录的全局变量处理  回归到默认状态
      this.getUserInfo.uid = 1;
      this.getUserInfo.uuser_name = "annoy";
      this.getUserInfo.ugender = '男';
      this.getUserInfo.uqq = 2598772546;
      this.getUserInfo.uavatar = "http://letang-hc.tech/jsonImg/artical-img/person_img.jpg";
      this.getUserInfo.friend_card = "";
      this.getUserInfo.uhobby = "不喜欢唱、跳、Rap与篮球，，，不过超级热爱写前端，(现在多一门后端)。\nPython也是我的最爱yo。";
      this.getUserInfo.ugithub = "https://github.com/ASP-CC";
      this.getUserInfo.uprofile = "自高考后暑假接触第一本Python电子书时，我对编程的热爱便没有了尽头。\n之后无意间接触到了Web开发，于是跟着Web部大佬学习Web技术，努力成为一名优秀的Web攻城狮。目前已习得前端三件套，Vue框架与Django框架。";
      // 取消所有权限
      Object.keys(this.getUserInfo.power).forEach(el => {
        this.$set(this.getUserInfo.power, el, false);
      })
      this.postMsg('已退出登录状态', 'success');
    }
  }
}
</script>

<style scoped>

#login-horizon {
  padding-right: 50px;
  display: flex;
  justify-content: flex-end;
}

#unLogin {
  text-align :center;
}
</style>

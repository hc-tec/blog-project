<template>

  <div id="login">
    <el-card class="login">
      <h1>登录</h1>
      <div class="arti_cont" v-for="(eng, hans) in info" :key="eng">
        <span class="title" ref="title">{{ eng }}</span>
        <label>{{ hans }}</label>
        <el-input
            style="width:90%;"
            :type="type[hans]"
            clearable
            v-model="content[hans]"
            @focus="titMove($event)"
            @blur="titDown($event)"
            @keyup.enter.native="login()"
            >
        </el-input>
      </div>
      <div class="btn-group">
        <el-button
          type="primary"
          @click="login()"
          class="waves-effect">登录</el-button>
        <el-button
          type="success"
          @click="regis()"
          class="waves-effect">注册</el-button>
      </div>

    </el-card>
  </div>

</template>

<script>
import {Card, Button, Input} from 'element-ui';

export default {
  components: {
    "el-card": Card,
    "el-button": Button,
    "el-input": Input,
  },
  data(){
    return {
      info: {
          "名称": "Name",
          "密码": "Password"
      },
      type: {
        "名称": "text",
        "密码": "password"
      },
      content: {
          "名称": "",
          "密码": ""
      }
    }
  },
  methods: {
    titMove: function(el) {
        let ele = el.currentTarget;
        let parent = ele.parentNode.parentNode;
        let span = parent.children[0];
        span.style.top = "-10px";
        span.style.opacity = "1";
    },
    titDown: function(el) {
        let ele = el.currentTarget || el;
        let parent = ele.parentNode.parentNode;
        let span = parent.children[0];
        let label = parent.children[1].innerText;
        if("" === this.content[label]){
          span.style.top = "6px";
          span.style.opacity = ".5";
        }
    },
    setCookie: (name, value) => {
        let exp = new Date();
        exp.setTime(exp.getTime() + 1000*60*60*24*30);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
    },
    login: function() {
      this.axios.post(`http://${this.host}/api/login`, `user_name=${this.content['名称']}&password=${this.content['密码']}`)
        .then(response => {
        let code = response.data['code'];
        let msg = response.data['msg'];
        let info = 'error';
        //状态码 270 表示登录成功
        if(270 == code){
          info = 'success';
          // 将 Token 读入 cookie 中
          let token = response.data['token'];
          this.setCookie('token', token);

          let user_info = response.data['data'];
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


          this.getUserInfo.power.isLogin = true
          // 获取用户类型
          if("超级管理员" === user_info['user_type']){
            // 获取所有权限
            this.getUserInfo.user_name = user_info['user_name'];
            Object.keys(this.getUserInfo.power).forEach(el => {
              this.$set(this.getUserInfo.power, el, true);

            })
          }
          // 登录成功后，延迟 0.5s 回到主页
          setTimeout(() => {
          this.$router.push({ path: '/' });
          }, 500);
        }
        // 发送提示消息
        this.postMsg(msg, info);
      }).catch(e => console.log(e))
    },
    regis: function(){
      this.$router.push('/register/');
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 0 auto;
}
#login {
  padding: 5% 5%;
}
.login h1 {
  text-align: center;
  margin-bottom: 5%;
  font-family: "宋体";
}
.el-button {
  width: 40%;
}
.btn-group {
  display: flex;
  justify-content: space-around;
}
.arti_cont {
    margin-bottom: 5%;
    position: relative;
}
.title {
    position: absolute;
    top: 6px;
    left: 11.5%;
    z-index: 1;
    color: rgb(64,158,255);
    font-size: 1em;
    background-color: white;
    opacity: .5;
    transition: all .3s;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

label {
    width: 10%;
    font-size: 1.1em;
    padding-top: 7px;
    float: left;
    font-family: "宋体";
}
@media screen and (max-width: 800px){
  .login {
    width: 100%;
  }
  label {
    display: none;
  }
}
</style>

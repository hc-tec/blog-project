<template>

  <div id="login">
    <!-- 登录页组件 -->
    <el-card class="login">
      <h1>登录</h1>
      <!-- 用户名、密码输入框 -->
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
      <!-- 登录注册按钮 -->
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
import { Card, Button, Input } from 'element-ui'
import { postMsg, ajaxPost } from '../elem_compo_encap'
export default {
  components: {
    'el-card': Card,
    'el-button': Button,
    'el-input': Input
  },
  data () {
    return {
      info: {
        名称: 'Name',
        密码: 'Password'
      },
      type: {
        名称: 'text',
        密码: 'password'
      },
      content: {
        名称: '',
        密码: ''
      }
    }
  },
  methods: {
    titMove: function (el) {
      const ele = el.currentTarget
      const parent = ele.parentNode.parentNode
      const span = parent.children[0]
      span.style.top = '-10px'
      span.style.opacity = '1'
    },
    titDown: function (el) {
      const ele = el.currentTarget || el
      const parent = ele.parentNode.parentNode
      const span = parent.children[0]
      const label = parent.children[1].innerText
      if (this.content[label] === '') {
        span.style.top = '6px'
        span.style.opacity = '.5'
      }
    },
    setCookie: (name, value) => {
      const exp = new Date()
      exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 30)
      document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
    },
    login: function () {
      ajaxPost(
        `http://${this.host}/api/login`, {
          user_name: this.content['名称'],
          password: this.content['密码']
        },
        this.succLogin, (e) => (console.log(e))
      )
    },
    succLogin: function (res) {
      const code = res.data.code
      const msg = res.data.msg
      let info = 'error'
      // 状态码 270 表示登录成功
      if (code == 270) {
        info = 'success'
        // 将 Token 读入 cookie 中
        const token = res.data.token
        this.setCookie('token', token)

        const user_info = res.data.data
        // 读取信息
        this.getUserInfo.uid = user_info.id
        this.getUserInfo.uuser_name = user_info.user_name
        this.getUserInfo.ugender = user_info.gender
        this.getUserInfo.uqq = user_info.qq
        this.getUserInfo.uavatar = user_info.avatar
        this.getUserInfo.friend_card = user_info.friend_card
        this.getUserInfo.uhobby = user_info.hobby
        this.getUserInfo.ugithub = user_info.github
        this.getUserInfo.uprofile = user_info.profile
        this.getUserInfo.uisSubscribe = user_info.isSubscribe
        this.getUserInfo.uregis_time = user_info.regis_time
        this.getUserInfo.uarticle_num = user_info.article_num
        this.getUserInfo.ubgImage = user_info.bgImage;

        this.getUserInfo.power.isLogin = true
        // 获取用户类型
        if (user_info.user_type === '超级管理员') {
          // 获取所有权限
          this.getUserInfo.user_name = user_info.user_name
          Object.keys(this.getUserInfo.power).forEach(el => {
            this.$set(this.getUserInfo.power, el, true)
          })
        }
        // 登录成功后，延迟 0.5s 回到主页
        setTimeout(() => {
          this.$router.push({ path: '/' })
        }, 500)
      }
      // 发送提示消息
      postMsg(msg, info)
    },
    regis: function () {
      this.$router.push('/register/')
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

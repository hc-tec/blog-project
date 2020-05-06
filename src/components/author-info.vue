<template>
  <div class="creator-info">
      <!-- 创作者展开按钮 -->
      <div class="creator-info-button" @click="slide">
        <span id="uarrow">«</span>
        <!-- «» -->
      </div>
      <!-- 创作者信息 -->
      <div class="info">
        <p>Author-Info</p>
        <!-- 头像 -->
        <div class="cimg-content">
          <img :src="authorInfo['avatar']" />
        </div>
        <!-- 名称 -->
        <p>{{ authorInfo['user_name']}}</p>
        <!-- 具体细节 -->
        <div class="details">
          <!-- QQ -->
          <div class="qq">
            <p>QQ</p>
            <p>{{ authorInfo['qq'] }}</p>
          </div>
          <!-- Hobby -->
          <div class="hobby">
            <p>Hobby</p>
            <p v-html="authorInfo['hobby']"></p>
          </div>
          <!-- 个人简介 -->
          <div class="profile">
            <p>Profile</p>
            <p v-html="authorInfo['profile']"></p>
          </div>
        </div>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- Github -->
        <div class="link-icon">
          <div>
            <a :href="authorInfo['github']"><img
              src="/jsonImg\artical-img/github.png"
              width="100%" height="100%">
            </a>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import { Divider } from 'element-ui'
export default {
  props: {
    authorInfo: {
      type: Object
    }
  },
  components: {
    "el-divider": Divider,
  },
  methods: {
    slide: function(){
      this.$emit("slide")
    }
  }
}
</script>

<style>
.author {
  cursor:pointer;
  display: inline;
  transition: color .3s;
}
.author:hover {
  color: #409eff;
}
.creator-info {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  z-index: 100;
}
.creator-info-button {
  cursor: pointer;
  float: left;
  padding: 30px 3px;
  background-color: #01ffef;
  border-radius: 5px;
  transition: all .2s;
  opacity: .5;
}
.creator-info-button:hover {
  background-color: #1cddd1;
  opacity: 1;
}
.creator-info-button:active {
  background-color: #3fb4ad;
}
.creator-info-button > span {
  display: inline-block;
  transition: all .6s;
}
.creator-info .info {
  /* width: 20rem; */
  width: 0;
  height: 100%;
  box-shadow: 0 0 2px rgba(0,0,0,0.2);
  text-align: center;
  background: #fff;
  transition: all .6s;
}
.info > p:nth-child(1) {
  font-size: 2em;
}
.info > p:nth-child(3) {
  color: #0078e7;
}
.info .details {
  margin: 0 30px;
}
.info .details > div p:nth-child(1) {
  text-align: left;
  position: relative;
}
.info .details > div p:nth-child(1)::before {
  content: '';
  position: absolute;
  width: 5px;
  height: 100%;
  top: 0;
  left: -10px;
  background: #27e6f3;
}
.info .details > div p:nth-child(2) {
  font-size: .9em;
}
.creator-info .cimg-content {
  margin: 30px auto;
}
.creator-info .cimg-content img {
  border-radius: 50%;
  height: 96px;
  width: 96px;
  padding: 4px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  transition: 0.4s;
}
.creator-info .link-icon {
  display: flex;
  justify-content: center;
}
.creator-info .link-icon > div {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 5px;
  transition: all .3s;
}
.creator-info .link-icon > div:hover {
  background-color: rgb(229,241,253);
}
.creator-info-button a:hover {
  text-decoration: none;
}
@media screen and (max-width: 800px){

}
</style>

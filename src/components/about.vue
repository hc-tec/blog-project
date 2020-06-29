<template>
  <div id="about">

    <div class="info-content">

      <div class="out-info">
        <h1>{{ content.uuser_name === 'annoy' ? 'Titto' : content.uuser_name }}</h1>
        <h4>{{ content.uqq }}</h4>
        <div class="article_num">
          共发布
            <h2>
              {{ content.uarticle_num }}
            </h2>
          篇博文
          <i class="el-icon-folder-checked"></i>
        </div>
      </div>

      <div class="figure">
        <router-link to='admin' v-if="this.getUserInfo.power.viewVistorStatus">
          <img :src="content.uavatar"/>
        </router-link>
        <img v-else :src="content.uavatar"/>
      </div>

      <div
        class="info-details"
        @mouseenter="showModifyBtn"
        @mouseleave="unshowModifyBtn">
        <p>Register-Time：</p>
          <p class="under-modify-info">{{ content.uregis_time }}</p>
        <p>Hobby：</p>
          <neu-input
            class="under-modify-info"
            v-model="content.uhobby"
            v-if="content.power.isLogin"
            type="textarea" />
          <p v-else>{{ content.uhobby }}</p>
        <p>Profile：</p>
          <neu-input
            class="under-modify-info"
            v-model="content.uprofile"
            v-if="content.power.isLogin"
            type="textarea" />
          <p v-else>{{ content.uprofile }}</p>
        <p>Github：</p>
          <neu-input
            class="under-modify-info"
            v-if="content.power.isLogin"
            v-model="content.ugithub"/>
          <p v-else>{{ content.ugithub }}</p>
        <neu-button v-if="content.power.isLogin" class="modify-btn" @click="modify">确认修改</neu-button>
      </div>


    </div>

    <creativeCollection :createdArticles="createdArticles" />

  </div>
</template>

<script>
import { ajaxGet, ajaxPatch, postMsg } from '../elem_compo_encap'
import { Link } from 'element-ui'
import creativeCollection from './creative-collection'
import { genericError } from '../func'
import { USER_INFO_MODIFY } from '../api'

export default {
  components: {
    "el-link": Link,
    creativeCollection
  },
  data(){
    return {
      notToAdmin: {
        "pointer-events": "none"
      },
      data: {},
      img: "",
      content: {},
      activeName: '1',
      name: 1,
      content: this.getUserInfo,

      createdArticles: [],
    }
  },
  methods: {
    getUserCreators() {
      const request = () => {
        ajaxGet(
          `http://${this.host}/api/createdArticle/${this.getUserInfo.uid}`, {},
          response, (e) => (console.log(e))
        )
      }
      const response = (res) => {
        this.createdArticles = res.data
      }
      request()
    },
    showModifyBtn() {
      const btn = document.getElementsByClassName('modify-btn')[0];
      btn.style.opacity = '1';
      btn.style.zIndex = '1';
    },
    unshowModifyBtn() {
      const btn = document.getElementsByClassName('modify-btn')[0];
      btn.style.opacity = '0';
      btn.style.zIndex = '-1';
    },
    modify() {
      const info = {
        'hobby': this.content.uhobby,
        'profile': this.content.uprofile,
        'github': this.content.ugithub
      }
      const request = () => {
        ajaxPatch(
          USER_INFO_MODIFY(this.content.uid), info,
          response, genericError
        )
      }
      const response = (res) => {
        if(res.data.code === 289) postMsg('信息修改成功', 'success');
        else postMsg('信息修改失败', 'danger')
      }
      request()
    }
  },
  mounted() {
    this.getUserCreators()
  }
}
</script>


<style>
/* src="../assets/css/aboutLink.css" */
#about {
  width: 100%;
}
.info-content,
.created-articles-content {
  width: 1170px;
  margin: 0 auto;
  position: relative;
}
.info-details {
  background-color: rgb(246,246,246);
  margin-top: 30px;
  padding: 30px 30px 30px 500px;
  position: relative;
}
.info-details > p:nth-child(even) {
  padding-left: 20px;
  margin: 10px 0;
}
.figure {
  position: absolute;
  top: -50px;
  left: 10%;
  z-index: 10;
}
.figure img {
  height: 300px;
  width: 300px;
  border-radius: 50%;
}
.out-info {
  padding-left: 500px;
}
.out-info * {
  display: inline;
}
.out-info > h1 {
  font-size: 3em;
}
.out-info > h4 {
  margin-left: 40px;
  color: gray;
}
.out-info h2 {
  font-size: 4em;
  position: relative;
  margin: 0 30px;
}
.out-info  h2::before {
  content: "[";
  position: absolute;
  left: -30px;
}
.out-info  h2::after {
  content: "]";
  position: absolute;
  right: -20px;
}
.article_num {
  margin-left: 150px;
}
.modify-btn {
  opacity: 0;
  position: absolute;
  bottom: 50px;
  left: 300px;
  z-index: -1;
  transition: opacity .3s;
}
.under-modify-info {
  background: transparent;
  border-radius: 4px;
  border: none;
  box-shadow: none;
  outline: none;
  font-size: 14px;
  line-height: 2;
  margin-left: 10px;
  padding: 0 5px;
  width: 500px;
}
.under-modify-info .neumorphic-input {
  line-height: 1.75;
  padding: 10px;
  box-shadow: none;
}
.under-modify-info .neumorphic-input:focus {
  box-shadow: var(--input-focus-shadow);
}

@media screen and (max-width: 800px){
  .info-content {
    width: 100%;
    margin-top: 150px;
  }
  .out-info,
  .info-details {
    padding-left: 30px;
  }
  .out-info {
    padding-top: 200px;
    text-align: center;
  }
  .out-info * {
    display: block;
  }
  .out-info h4 {
    margin: 10px 0;
  }
  .article_num {
    margin: 0;
  }
  .figure {
    top: -150px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>

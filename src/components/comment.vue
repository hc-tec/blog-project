<template>
  <div>

    <div class="comment-info">
    <h1>留言</h1>

    <div class="arti_cont" v-for="(eng, hans) in info" :key="eng" v-if="show[hans]">
      <span class="title" ref="title">{{ eng }}</span>
      <label>{{ hans }}</label>
      <el-input
          style="width:80%;"
          type="textarea"
          :autosize="{ minRows: 1}"
          clearable
          v-model="content[hans]"
          @focus="titMove($event)"
          @blur="titDown($event)"
          @keyup.enter.native="initSubmit()"
          >
      </el-input>
    </div>


  <el-button
    class="waves-effect"
    type="primary"
    id="submit"
    @click="initSubmit()"
    round>提交
  </el-button>
  </div>

    <div class="comment" v-for="message in messages" :key="message['id']">
      <div class="comment-content">
        <div class="other">
          <div class="comment-img">
            <img :src="message['portrait']">
          </div>

            <span class="name">
              <a :href="message['url']">
                · {{ message['name'] }}
              </a>
            </span>

          <span class="comment-time">
            · {{ message['publicDay'] }}
          </span>
          <p class="text">
            {{ message['text'] }}
          </p>
        </div>


      </div>

      <div class="btn_group" v-if="showWorkBtn">
        <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="top">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            :style="edit_btn"
            plain
            @click="editMsg($event)"></el-button>
        </el-tooltip> -->

        <el-tooltip class="item" effect="dark" content="删除" placement="top">
          <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          :style="del_btn"
          plain
          @click="initDelMsg($event)"
          :class="message['id']"></el-button>
        </el-tooltip>
      </div>

    </div>

  </div>
</template>

<script>
import { Tooltip, Input, Button } from 'element-ui';
import { postMsg } from '../elem_compo_encap'
import Qs from 'qs'
import { ajaxPost, ajaxGet } from '../elem_compo_encap'
export default {
  components: {
    "el-tooltip": Tooltip,
    "el-input": Input,
    "el-button": Button,
  },
  data(){
    return {
      info: {
        "名称": "Name",
        "个人网站": "Url(选填 也可填 Github 网站)",
        "头像网址": "Img-Url(选填)",
        "留言内容": "Text"
      },
      content: {
        "名称": "",
        "个人网站": "",
        "头像网址": "",
        "留言内容": ""
      },
      show: {
        "名称": this.getUserInfo.uuser_name === 'annoy',
        "个人网站": this.getUserInfo.uuser_name === 'annoy',
        "头像网址": this.getUserInfo.uuser_name === 'annoy',
        "留言内容": true
      },
      messages: null,
      del_btn: {
        "height": "30px",
        "width": "30px",
        "text-align": "centen",
        "padding": "0px",
      },
      edit_btn: {
        "height": "30px",
        "width": "30px",
        "text-align": "centen",
        "padding": "0px",
      },
      showWorkBtn: this.getUserInfo.power.editMsg,
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
    initSubmit: function() {
        let data = {
          "name": this.getUserInfo.uuser_name === 'annoy' ? this.content["名称"] : this.getUserInfo.uuser_name,
          "url": this.getUserInfo.uuser_name === 'annoy' ? this.content["个人网站"] : this.getUserInfo.ugithub,
          "text": this.content["留言内容"],
          "portrait": this.getUserInfo.uuser_name === 'annoy' ? this.content["头像网址"] : this.getUserInfo.uavatar
        };
        ajaxPost(
          "http://47.115.147.39/add_message.php", data,
          this.succSubmitComment, (e)=>(console.log(e))
        )
    },
    succSubmitComment: function(res){
      let code = res.data['code'];
      let msg = res.data['msg'];
      let info = 'error';
      if(230 == code){
        info = 'success';
        Object.keys(this.content).forEach(ele => {
          this.content[ele] = "";
        });
        let input = document.getElementsByTagName("textarea");
        for(let el of input){
          this.titDown(el);
        }
      }
      this.getMessages();
      postMsg(msg, info);
    },
    getMessages(){
      ajaxGet(
        'http://47.115.147.39/message.php', {},
        this.succGetMessage, (e)=>{console.log(e)}
      )
    },
    succGetMessage: function(req){
      this.messages = req.data['comment'];
    },
    editMsg(el){

    },
    initDelMsg(el){
      let ele = el.currentTarget;
      let classes = ele.getAttribute('class');
      let regex = /\d+/;
      let id = classes.match(regex)[0];
      ajaxPost(
        "http://47.115.147.39/del_message.php", {id:id},
        this.succDelMsg, (e)=>(console.log(e))
      )
    },
    succDelMsg: function(res){
      let code = res.data['code'];
      let msg = res.data['msg'];
      let info = 'success';
      if(340 == code){
        info = 'error';
      }
      this.getMessages();
      postMsg(msg, info);
    }
  },
  mounted(){
    this.getMessages();
  }
}
</script>

<style scoped>
.btn_group {
  position: absolute;
  right: 60px;
  top: 20%;
  display: flex;

}
.comment-content {
  overflow: hidden;
  background-color: rgb(250, 246, 246);
}
.other {
  width: 100%;
  float: left;
  cursor: auto;
  margin: 0;
  padding: 10px 20px;
  background-color: rgb(250, 246, 246);
}
.comment {
  margin-bottom: 1%;
  padding: 10px 20px;
  width: 1000px;
  background-color: #fff;
  position: relative;
  height: 120px;
}
.comment-img {
  width: 105px;
  height: 100px;
  overflow: hidden;
  border-radius: 10px;
  float: left;
}
.comment-img > img {
  width: 100%;
  height: 100%;
}
span {
  font-size: 1.2em;
  margin-top: 4%;
}
.name {
  font-size: 1.2em;
  margin-left: 4%;
  color: turquoise;
}
.text {
  font-size: 1.4em;
  margin: 3% 10% 0 25%;
}
.comment-time {
  color: gray;
  margin-left: 1%;
}


.comment-info {
  background-color: #fff;
  padding: 15px 0;
  margin-bottom: 3%;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.comment-info > h1 {
  text-align: center;
  margin-bottom: 2%;
}
.arti_cont {
    width: 90%;
    margin-bottom: 3%;
    position: relative;
    margin: 0 auto;
    margin-bottom: 2%;
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
    margin-top: 0;
    transition: all .3s;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

label {
    width: 10%;
    font-size: 1.1em;
    padding-top: 7px;
    float: left;
}
#submit {
  width: 40%;

  margin: 0 0 0 30%;

}
@media screen and (max-width: 800px){
  .comment {
    width: 100%;
    margin-bottom: 0;
    padding: 0;
  }
  .arti_cont textarea {
    min-height: 90px;
  }
  .arti_cont label {
    display: none;
  }
  .text{
    margin: 3% 20px 0 150px;
    font-size: 1.2em;
  }
  .btn_group {
    right: 0;
    bottom: 10px;
    top: unset;
  }
}
</style>

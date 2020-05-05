<template>
  <div class="comment-info">
    <h1>留言</h1>
    <div class="arti_cont" v-for="(eng, hans) in info" :key="eng">
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
          >
      </el-input>
    </div>
  <p id="submit" @click="submit()">提交</p>
  </div>
</template>

<script>
import {Input} from 'element-ui'
import Qs from 'qs'
export default {
  components: {
    "el-input": Input,
  },
  data(){
    return {
        info: {
          "名称": "Name",
          "个人网站": "Url(选填)",
          "头像网址": "Img-Url(选填)",
          "留言内容": "Text"
        },
        content: {
          "名称": "",
          "个人网站": "",
          "头像网址": "",
          "留言内容": ""
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
    submit: function() {
        let data = {
          "name": this.content["名称"],
          "url": this.content["个人网站"],
          "text": this.content["留言内容"],
          "portrait": this.content["头像网址"]
        };
        this.axios(
          {
            method: 'post',
            url: `http://47.115.147.39/add_message.php`,
            data: Qs.stringify(data)
          }
        ).then(response => {
          let code = response.data['code'];
          let msg = response.data['msg'];
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

          this.postMsg(msg, info);
        }).catch(e => console.log(e))
    }
  }
}
</script>

<style scoped>
.comment-info {
  background-color: #fff;
  padding: 15px 0 0 0;
  margin-bottom: 3%;
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
  width: 200px;
  padding: 10px 20px;
  background-color: #5dff92;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 3%;
  border-radius: 20px;
  cursor: pointer;
  transition: all .2s;
}
#submit:hover {
  background-color: #42c56c;
}
#submit:active {
  background-color: #34854f;
}
</style>

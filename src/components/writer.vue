<template>
  <div id="writer">
    <div id="article">


        <!-- 预览 -->
        <preview
          ref="preview"
          :article="article">
        </preview>

        <div style="width:100%;" id="workSpace">
          <!-- 未登录 -->
          <p v-if="!this.getUserInfo.power.isLogin" style="color:red;">需要先登录才能写文章哦</p>

          <el-form :model="article" class="form">

            <el-form-item label="标题">
                <el-input
                    placeholder="Place your title Here"
                    type="text"
                    style="width:95%"
                    clearable
                    v-model="article.title"
                    id="title_in"
                    :disabled="!this.getUserInfo.power.isLogin"
                    >
                </el-input>
            </el-form-item>

            <el-form-item label="文章 (支持 MarkDown 语法喔！)">
                <br />
                <mavon-editor
                  ref="editor"
                  class="markdown"
                  v-model="article.content"
                  @imgAdd="imgInsert"
                />
            </el-form-item>

            <el-form-item label="类别" id="category">
              <el-select v-model="article.category" placeholder="Please select category" :disabled="!this.getUserInfo.power.isLogin">
                <el-option
                  v-for="(cate) in category"
                  :label="cate.name"
                  :value="cate.name"
                  :key="cate.name"></el-option>
              </el-select>

              <el-button
                v-if="this.getUserInfo.power.isLogin"
                icon="el-icon-plus"
                style="margin-left: 20px;"
                @click="addCategory()"></el-button>

            </el-form-item>

            <el-form-item label="标签">
                <el-checkbox-group v-model="article.tag" style="display: inline;" :disabled="!this.getUserInfo.power.isLogin">
                  <el-checkbox-button
                    v-for="(tag) in tags"
                    :key="tag.name"
                    :label="tag.name">
                  </el-checkbox-button>
                </el-checkbox-group>

                <el-button
                  v-if="this.getUserInfo.power.isLogin"
                  icon="el-icon-plus"
                  style="margin-left: 20px;"
                  @click="addTag()">
                </el-button>

            </el-form-item>

            <!-- 预览、提交按钮 -->
            <div id="btn_group" v-if="this.getUserInfo.power.isLogin">
                <a class="sub_btn" @click="submit()">{{ this.editArticleDetail.isEdit ? 'Edit!' : 'Create!' }}</a>
                <a class="sub_btn" @click="pre()">Preview</a>
            </div>
          </el-form>
        </div>
    </div>
  </div>
</template>

<script>
import preview from './preview'

import { Form, FormItem, Input, Select, Option,
         Button, CheckboxGroup, CheckboxButton } from 'element-ui';

import { postMsg, ajaxPost, ajaxGet, elprompt, elconfirm } from '../elem_compo_encap';

export default {
    components: {
      "el-form": Form,
      "el-form-item": FormItem,
      "el-input": Input,
      "el-select": Select,
      "el-option": Option,
      "el-button": Button,
      "el-checkbox-group": CheckboxGroup,
      "el-checkbox-button": CheckboxButton,
      preview
    },
    data(){
        return {
            article: {
              title: this.editArticleDetail.title,
              content: this.editArticleDetail.content,
              category: this.editArticleDetail.category,
              tag: this.editArticleDetail.tags,
            },
            category: [],
            tags: [],
            fileList: [],
        }
    },
    methods: {
        imgInsert: function(pos, file) {
          if(this.fileSize(file.size)){
            let param = new FormData();
            param.append('file', file, file.name);
            let config = {
              headers: {'Content-Type': 'multypart/form-data'}
            };
            this.axios.post(`http://${this.host}/api/fileLoader`, param, config)
              .then(response => {
                let code = response.data['code'];
                let msg = response.data['msg'];
                if(282 === code){
                  // this.fileList.unshift({name: file.name, url: `${msg}`});
                  this.$refs.editor.$img2Url(pos, msg)
                } else {
                  postMsg(msg, 'error');
                }
              }).catch(e => (console.log(e)))
          } else {
            postMsg("图片过大了哦，压缩或者换张吧", "error");
          }
        },
        copyHandle(content){
          let copy = (e)=>{
              e.preventDefault()
              e.clipboardData.setData('text/plain',content)
              document.removeEventListener('copy',copy)
          }
          document.addEventListener('copy',copy)
          document.execCommand("Copy");
        },
        fileSize: (size) => {
          const isLt2M = (size / 1024 / 1024);
          return isLt2M <= 3;
        },
        mark: (para) => {
          return marked(para || '')
        },

        initGetTag: function(){
          ajaxGet(
            `http://${this.host}/api/tags`, {},
            this.succGetTag, (e)=>(console.log(e))
          )
        },
        succGetTag: function(res){
          let code = res.data['code'];
          if(277 == code){
            this.tags = res.data['data'];
            this.articles.tags = res.data['data'];
          }else{
            let msg = res.data['msg'];
            postMsg(msg, 'error');
          }
        },

        getCategory: function(){
          ajaxGet(
            `http://${this.host}/api/category`, {},
            this.succGetCategory, (e)=>(console.log(e))
          )
        },
        succGetCategory: function(res){
          let code = res.data['code'];
          if(278 == code){
            this.category = res.data['data'];
            this.articles.category = res.data['data'];
          }else{
            let msg = res.data['msg'];
            postMsg(msg, 'error');
          }
        },

        addTag: function(){
          const title = "标签框框";
          const tip_text = "请输入需添加的标签";
          elprompt(
            title, tip_text,
            this.initAddTag, ()=>{},
            false, {
              confirmButtonText: '就决定是你了！',
              cancelButtonText: '就先不添加了',
            }
          )
        },
        initAddTag: function(name){
          ajaxGet(
            `http://${this.host}/api/newTag`,{name: name},
            this.succAddTag, this.failAddTag
          )
          name = {
            name,
            num: 0
          }
          this.articles.tags.push(name);
        },
        succAddTag: function(res){
          let code = res.data['code'];
          let msg = res.data['msg'];
          let info = 'error';
          if(275 == code){
            info = 'success';
          }
          postMsg(msg, info);
        },
        failAddTag: function(e){
          console.log(e);
          postMsg("标签添加失败",'danger');
        },

        addCategory: function(){
          const title = "类别框框";
          const tip_text = "请输入需添加的类别";
          elprompt(
            title, tip_text,
            this.initAddCategory,()=>{},
            false, {
              confirmButtonText: '就决定是你了！',
              cancelButtonText: '要不，换个吧',
            }
          )
        },
        initAddCategory: function(name){
          ajaxGet(
            `http://${this.host}/api/newCategory`,{name:name},
            this.succAddCategory, this.failAddCategory
          )
          name = {
            name,
            num: 0
          }
          this.articles.category.push(name);
        },
        succAddCategory: function(res){
          let code = res.data['code'];
          let msg = res.data['msg'];
          let info = 'error';
          if(276 == code){
            info = 'success';
          }
          postMsg(msg, info);
        },
        failAddCategory: function(e){
          console.log(e);
          postMsg("类别添加失败", 'danger');
        },

        pre: function() {
            this.$refs.preview.pre();
            window.MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        },
        cancelPre: function() {
            this.$refs.preview.cancelPre();
        },
        asynPost: function(url, data, successCode){
          this.axios.post(
            url,
            data
          ).then(response => {
              let data = response.data;
              let code = data['code'];
              let msg = data['msg'];
              if(code == successCode){
                postMsg(msg, 'success');
              } else {
                postMsg(msg, 'error');
              }
            })
        },
        submit: function() {
          const title = "";
          const tip_text = "请确定是否提交文章？";
          elconfirm(
            title, tip_text,
            "", this.initSubmit, ()=>{},
            false, {
                confirmButtonText: "确定",
                cancelButtenText: "取消",
                center: true,
            }
          )
        },
        initSubmit: function(){
          let user_name = this.getUserInfo.uuser_name;
          if(user_name && user_name !== 'annoy'){
            let data = "";
            let article = JSON.parse(JSON.stringify(this.article));

            // 将文章内容格式转化，防范特殊符号问题
            article['content'] = encodeURIComponent(article['content']);
            article['title'] = encodeURIComponent(article['title']);
            article['tag'] = encodeURIComponent(article['tag']);
            let keyList = Object.keys(article);
            keyList.forEach(el => {
              data += `${el}=${article[el]}&`;
            })

            // 是否为编辑模式
            if(this.editArticleDetail.isEdit){
              data += `creator=${this.editArticleDetail.creator.user_name}`;
              // 附加值--id
              data = data + `&id=${this.editArticleDetail.id}`;
              this.asynPost(`http://${this.host}/api/editArticle`, data, 283);
              // 全局变量 -- 编辑文章细节恢复为空值
              Object.keys(this.editArticleDetail).forEach(key => {
                this.editArticleDetail[key] = "";
              })
              // 特殊空值处理，必须为数组，否则会出错
              this.editArticleDetail.tags = [];
            } else {
              data += `creator=${user_name}`;
              this.asynPost(`http://${this.host}/api/writeArticle`, data, 273);

            }
            this.articles.isWrite = true;
            setTimeout(() => {
              this.$router.push('/web');
            }, 500);

          } else {
            postMsg('您需登录后才能发表文章哦', 'error');
          }
        },
        canGetTags: function(){
          if(null === this.articles.tags){
            this.initGetTag();
          } else {
            this.tags = this.articles.tags;
          }
        },
        canGetCategory: function(){
          if(null === this.articles.category){
            this.getCategory();
          } else {
            this.category = this.articles.category;
          }
        }
    },
    beforeDestroy(){
      this.editArticleInit();
    },
    mounted(){
      this.canGetCategory();
      this.canGetTags();
      this.$nextTick(function() {
        setTimeout(() => {
        window.MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }, 2000)
      });
    },
}
</script>

<style>
#writer .v-note-wrapper {
  min-height: 500px;
  max-height: 80vh;
}
#writer .auto-textarea-block,
#writer .auto-textarea-input {
  max-width: 500px;
}
#category {
  margin-bottom: 0;
}
.auto-textarea-wrapper .auto-textarea-input,
#writer .markdown .v-note-show  * {
  margin: 5px !important;
  font-family: Constantia, 华文中宋, 宋体, serif !important;
  white-space: normal;
}
.form {
  display: flex;
  flex-wrap: wrap;
  opacity: .7;
  flex-direction: column;
}
.el-form-item__label {
  color: white;
}
#writer {
  padding: 20px 0 15% 0;
  margin: 0 auto;
  background-color: white;
  background-image: url('http://39.100.22.224/static/cc817057-541b-4017-a8dd-11fa175fd52e.jpg');
}
#workSpace h1{
  margin: 0 0 5% 35%;
}
#article {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.arti_cont {
    width: 100%;
    margin-bottom: 3%;
    position: relative;
}

/* .title {
    position: absolute;
    top: 9px;
    left: 11.5%;
    z-index: 1;
    color: rgb(64,158,255);
    background-color: white;
    opacity: .5;
    transition: all .3s;
} */



#btn_group {
    margin-right: 15%;
    overflow: hidden;
}

.sub_btn {
    float: right;
    margin-left: 12px;
    padding: 5px 20px;
    color: black;
    cursor: pointer;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
    font-weight: 400;
}

.sub_btn:nth-child(1) {
    background-color: rgb(101,84,192);
    color: white;
}

.sub_btn:nth-child(2) {
    background-color: rgb(235,236,240);
}

.sub_btn:nth-child(1):hover {
    background-color: rgb(135,119,217);
}

.sub_btn:nth-child(2):hover {
    background-color: rgb(223,225,230);
}

.sub_btn:nth-child(1):active {
    background-color: rgb(101,84,192);
}

.sub_btn:nth-child(2):active {
    background-color: rgb(193,199,208);
}


.imgFiles {
  width: 80%;
  display: flex;
  flex-direction: column;
  list-style-type: none;

}
.imgFiles > li {
  padding: 10px 20px;
  position: relative;
  border: 1px solid #00d0ff;
}
.imgFiles > li > span {
  position: absolute;
  left: 150px;
  top: 40%;
}
.imgFiles > li > button {
  position: absolute;
  right: 30px;
  top: 30%;
}
.file-box{
  display: inline-block;
  position: relative;
  color:#000;
  background-color: rgb(235,236,240);
  padding: 5px 20px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
  font-weight: 400;
}
.file-btn{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  outline: none;
  background-color: transparent;
  filter:alpha(opacity=0);
  -moz-opacity:0;
  -khtml-opacity: 0;
  opacity: 0;
  cursor: pointer;
}
@media screen and (max-width: 800px){
  #writer {
    text-align: center;
    padding: 10px;
    padding-bottom: 100px;
  }
  #workSpace h1 {
    margin-left: 0;
  }
}
</style>

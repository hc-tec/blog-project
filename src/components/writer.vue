<template>
  <div id="writer">
    <div id="article">
        <div id="pre_bg" ref="pre_bg" @click="cancelPre()"></div>
        <div ref="pre_arti" id="pre_arti">
            <p></p>
            <hr />
            <div class="preArticle"></div>
        </div>

        <div style="width:100%;" id="workSpace">
          <h1>Write It Down!</h1>
          <p v-if="!this.getUserInfo.power.isLogin" style="color:red;">需要先登录才能写文章哦</p>
          <el-form :model="article" class="form">

            <el-form-item label="标题">
                <el-input
                    placeholder="Place your title Here"
                    style="width:80%;"
                    type="text"
                    clearable
                    v-model="article.title"
                    id="title_in"
                    :disabled="!this.getUserInfo.power.isLogin"
                    >
                </el-input>
            </el-form-item>


            <el-form-item label="类别" id="category">
              <el-select v-model="article.category" placeholder="Please select category" :disabled="!this.getUserInfo.power.isLogin">
                <el-option
                  v-for="(cate) in category"
                  :label="cate"
                  :value="cate"
                  :key="cate"></el-option>
              </el-select>

              <el-button
                v-if="this.getUserInfo.power.isLogin"
                icon="el-icon-plus"
                style="margin-left: 20px;"
                @click="addCategory()"></el-button>

            </el-form-item>


            <el-form-item label="文章 (支持 MarkDown 语法喔！)">
                <el-input
                    :disabled="!this.getUserInfo.power.isLogin"
                    placeholder="Write Something..."
                    style="width:80%;display:block;font-family: Constantia, 华文中宋, 宋体, serif !important;"
                    type="textarea"
                    :autosize="{ minRows: 10, maxRows: 12}"
                    v-model="article.content"
                    id="content">
                </el-input>

                <div class="file-box">
                  <input
                    v-if="this.getUserInfo.power.isLogin"
                    class="file-btn"
                    type="file"
                    @change="load($event)"
                    accept="image/png,image/gif,image/jpeg,image/bmp,image/jpg,image/tif,image/svg,image/webp" />
                    上传图片
                </div>

                <ul class="imgFiles">
                  <li v-for="(file) in fileList" :key="file.name">
                    <img :src="file.url" width="100" height="100">
                    <span>{{ file.name }}</span>
                    <el-button @click="insert(file.url)">Insert</el-button>
                  </li>
                </ul>

            </el-form-item>



            <el-form-item label="标签" style="width:80%">
                <el-checkbox-group v-model="article.tag" style="display: inline;" :disabled="!this.getUserInfo.power.isLogin">
                  <el-checkbox-button
                    v-for="(tag) in tags"
                    :key="tag"
                    :label="tag">
                  </el-checkbox-button>
                </el-checkbox-group>

                <el-button
                  v-if="this.getUserInfo.power.isLogin"
                  icon="el-icon-plus"
                  style="margin-left: 20px;"
                  @click="addTag()">
                </el-button>

            </el-form-item>


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
import Qs from 'qs'
let marked = require('marked');
let hljs = require('highlight.js');
import 'highlight.js/styles/default.css';

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code, lang) {
          if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(lang, code, true).value;
          } else {
            return hljs.highlightAuto(code).value;
          }
      }
  });

export default {
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
        load: function(el){
          let file = el.target.files[0];
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
                  this.fileList.unshift({name: file.name, url: `${msg}`});
                } else {
                  this.postMsg(msg, 'error');
                }
              }).catch(e => (console.log(e)))
          } else {
            this.postMsg("图片过大了哦，压缩或者换张吧", "error");
          }

        },
        insert: function(fileUrl){
          let url = `![](${fileUrl})`;
          this.insertText('content', url);
        },
        insertText: (id, str) => {
          let obj = document.getElementById(id);
          obj.focus();
          if (document.selection) {
            var sel = document.selection.createRange();
            sel.text = str;
          } else if (typeof obj.selectionStart == 'number'
              && typeof obj.selectionEnd == 'number') {
            var startPos = obj.selectionStart, endPos = obj.selectionEnd, cursorPos = startPos, tmpStr = obj.value;
            obj.value = tmpStr.substring(0, startPos) + str
                + tmpStr.substring(endPos, tmpStr.length);
            cursorPos += str.length;
            obj.selectionStart = obj.selectionEnd = cursorPos;
          } else {
            obj.value += str;
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
        getTag: function(){
          this.axios
            .get(`http://${this.host}/api/tags`)
            .then(response => {
              let code = response.data['code'];
              if(277 == code){
                this.tags = response.data['data'];
                this.articles.tags = response.data['data'];
              }else{
                let msg = response.data['msg'];
                this.postMsg(msg, 'error');
              }
            }).catch(e => console.log(e));
        },
        getCategory: function(){
          this.axios
            .get(`http://${this.host}/api/category`)
            .then(response => {
              let code = response.data['code'];
              if(278 == code){
                this.category = response.data['data'];
                this.articles.category = response.data['data'];
              }else{
                let msg = response.data['msg'];
                this.postMsg(msg, 'error');
              }
            }).catch(e => console.log(e));
        },
        addTag: function(){
          this.$prompt("请输入需添加的标签", "标签框框", {
            confirmButtonText: '就决定是你了！',
            cancelButtonText: '要不，换个吧',
          }).then(({value}) => {
            this.asynAddTag(value);
            this.articles.tags.push(value);
          }).catch((e) => {
            console.log(e)
            this.postMsg("下次一定", 'info');
          })
        },
        addCategory: function(){
          this.$prompt("请输入需添加的类别", "类别框框", {
            confirmButtonText: '就决定是你了！',
            cancelButtonText: '要不，换个吧',
          }).then(({value}) => {
            this.asynAddCategory(value);
            this.articles.category.push(value);
          }).catch((e) => {
            console.log(e)
            this.postMsg("下次一定", 'info');
          })
        },
        asynAddCategory: function(name){
          this.axios
            .get(`http://${this.host}/api/newCategory`,{
              params: {
                name: name
              }
            }).then(response => {
              let code = response.data['code'];
              let msg = response.data['msg'];
              let info = 'error';
              if(276 == code){
                info = 'success';
              }
              this.postMsg(msg, info);
            }).catch(e => console.log(e))

        },
        asynAddTag: function(name){
          this.axios
            .get(`http://${this.host}/api/newTag`,{
              params: {
                name: name
              }
            }).then(response => {
              let code = response.data['code'];
              let msg = response.data['msg'];
              let info = 'error';
              if(275 == code){
                info = 'success';
              }
              this.postMsg(msg, info);
            }).catch(e => console.log(e))

        },
        pre: function() {
            let article = this.$refs.pre_arti.children;
            let bg = this.$refs.pre_bg;
            this.$refs.pre_arti.style.visibility = "visible";
            bg.style.visibility = "visible";
            this.$refs.pre_arti.style.transform = "translate(-50%, 0)";
            article[0].innerHTML = this.article.title;
            article[2].innerHTML = this.mark(this.article.content || '');
            window.MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        },
        cancelPre: function() {
            let article = this.$refs.pre_arti.children;
            let bg = this.$refs.pre_bg;
            this.$refs.pre_arti.style.visibility = "hidden";
            bg.style.visibility = "hidden";
            this.$refs.pre_arti.style.transform = "translate(-50%, -200%)";
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
                this.postMsg(msg, 'success');
              } else {
                this.postMsg(msg, 'error');
              }
            })
        },
        submit: function() {
            this.$confirm("请确定是否提交文章？",{
                confirmButtonText: "确定",
                cancelButtenText: "取消",
                center: true,
            }).then(() => {
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
                this.postMsg('您需登录后才能发表文章哦', 'error');
              }
            }).catch((e) => {
                this.postMsg("取消提交", "info");
                console.log(e);
            });
        },
        canGetTags: function(){
          if(null === this.articles.tags){
            this.getTag();
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
        window.MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      });
    },
}
</script>

<style>
#category {
  margin-bottom: 0;
}
.form {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
#writer {
  padding: 5% 0 150px 15%;
  background-color: white;
}
#workSpace h1{
  margin: 0 0 5% 35%;
}
#article {
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

#pre_bg {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgb(132,143,160);
    opacity: .5;
    visibility: hidden;
    transition: all .3;
}

#pre_arti {
    position: fixed;
    z-index: 110;
    width: 600px;
    margin:30px auto;
    background-color: white;
    color: black;
    box-shadow: 0 3px 9px rgba(0,0,0,.5);
    transform: translate(-50%, -200%);
    left: 50%;
    top: 10%;
    max-height: 70%;
    white-space: pre-wrap;
    overflow: auto;
    border-radius: 6px;
    visibility: hidden;
    transition: all .5s ease-out;
    text-indent: 0;
}

#pre_arti > p {
    font-size: 18px;
    padding: 15px;
    text-align: center;
}
#pre_arti > div {
    padding: 15px;
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
.preArticle img {
  display: flex;
  margin: 0.5rem auto;
  max-width: 92%;
  max-height: 500px;
  border-radius: 0.2rem;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
  transition: 0.4s;
}
.preArticle table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 14px;
  overflow: auto;
}
.preArticle th {
  padding-bottom: 10px;
  font-weight: 700;
}
.preArticle th,
.preArticle td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
  vertical-align: middle;
  font-weight: normal;
}
.preArticle table > tbody > tr:nth-of-type(odd) {
  background-color: #fafafa;
}
.preArticle table > tbody > tr:hover {
  background-color: rgb(245,245,245);
}

.preArticle pre {
  padding: .88889em;
  font-size: 1.2em;
  word-break: normal;
  word-wrap: normal;
  white-space: pre;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: #f6f6f6;
  border-radius: 4px;
}
.preArticle ol,
.preArticle ul {
  background: #dbde1f7a;
  padding: 20px 40px;
  border-radius: 4px;
  color: #291c1c;
  font-size: .9em;
}
.preArticle blockquote {
  margin-left: 10px;
  border-left: 7px solid #787f8857;
  background-color: #e1e7e891;
  padding-left: 20px;
  color: gray;
  font-size: 0.9em;
}
.preArticle h1,
.preArticle h2,
.preArticle h3,
.preArticle h4,
.preArticle h5,
.preArticle h6 {
  position: relative;
  border-bottom: 1px dotted rgba(153,153,153,0.5);
}
.preArticle h1::before,
.preArticle h2::before,
.preArticle h3::before,
.preArticle h4::before,
.preArticle h5::before,
.preArticle h6::before {
  content: '';
  position: absolute;
  width: 5px;
  height: 100%;
  top: 0;
  left: -10px;
  background: #27e6f3;
}
.preArticle a {
  color: #0065ff;
}
.preArticle a:hover {
  color: #0747A6;
  text-decoration: underline;
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
  #pre_arti {
    width: 100%;
  }

}
</style>

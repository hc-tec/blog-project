<template>
  <div class="article" id="article-life">
    <!-- 文章详细 -->
    <article>
      <!-- 标题 -->
      <p class="title">{{ article['title']}}</p>
      <!-- 创作者 -->
      <p @click="slide" class="author"><i class="el-icon-user"></i> 创作者: {{ article['creator']['user_name'] }}</p>
      <!-- 创作时间 -->
      <p><i class="el-icon-date"></i> 创作时间: {{ article['create_time'] }} </p>
      <!-- 阅览次数 -->
      <p><i class="el-icon-view"></i> 阅读次数: {{ article['click_num'] }} </p>

      <!-- <div class="para">{{ article['content'] }}</div> -->
      <!-- 文章内容 -->
      <div class="para" v-html="mark(article['content'])"></div>
      <!-- 分割线 -->
      <el-divider></el-divider>
    </article>

    <!-- 目录 -->
    <catalog :parent="articleObject"></catalog>

    <!-- 页面处文章信息：类别、标签 -->
    <div id="article-info">
      <p><i class="el-icon-data-analysis"></i> 类别: {{ article['category'] }}</p>
      <span><i class="el-icon-price-tag"></i> 标签:</span>

      <span
        v-for="(tag) in article['tags']"
        :key="tag">
        {{ tag }} &nbsp;&nbsp;
      </span>
    </div>

    <!-- 创作者信息，点击右侧蓝色展开按钮可打开 -->
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

    <!-- 评论 -->
    <comment-v2
      :comment="comment"
      :reply="reply"
      :replied_comment_id="replied_comment_id"
      :replied_user_name="replied_user_name"
      :total="total"
      :pagi_count="pagi_count"
      :article="article"
      @cancelReply="cancelReply"
      @initSubmitComment="initSubmitComment($event)"
      @getCommentId="getCommentId($event)"
      @pageChange="pageChange($event)"
    ></comment-v2>

  </div>
</template>

<script>
import catalog from './catalog'
import comment_v2 from './comment_v2'
import { Divider, Popover, Button, Pagination } from 'element-ui';
import { ajaxGet, ajaxPost, postMsg } from '../elem_compo_encap';

let marked = require('marked');
let hljs = require('highlight.js');
import 'highlight.js/styles/an-old-hope.css';

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
      id: this.$route.params.web,
      article: {},
      canSlideOut: true,
      authorInfo: {},
      hasGetInfo: false,

      comment: {},
      reply: false,
      replied_comment_id: '-1',
      replied_user_name: '',
      total: 0,      // 总评论
      pagi_count: 5, // 每页评论数
      current_page: 1,

      articleObject: null
    }
  },
  components: {
    "el-divider": Divider,
    "el-popover": Popover,
    "el-button": Button,
    catalog,
    "comment-v2": comment_v2,
  },
  methods: {
    initMakeCatalog(el){
      this.articleObject = document.getElementsByClassName(el)[0];
    },

    onEnterKey(e) {
      this.initSubmitComment()
    },
    emojiDataAll() {
      return EmojiAllData;
    },
    emojiGroups() {
      return EmojiGroups;
    },


    copy(code){
      document.addEventListener('copy', save);
      document.execCommand('copy');
      document.removeEventListener('copy', save);
      function save(event){
        event.clipboardData.setData('text/plain', code);
        event.preventDefault();
      }
      this.notify("","复制成功","success");
    },
    addCodeLangToPre(content){
      let pre = document.getElementsByClassName(content)[0].querySelectorAll('pre');
      pre.forEach(el => {
        // 获取 pre 的 code 子元素
        let code = el.children[0];
        // 获取此时的 code，避免后续元素污染
        let code_content = code.textContent;
        // 设置为 relative，为之后的 absolute 做准备
        el.style.position = "relative";
        // 获取 code 的lang类型<code class="language-xxx"></code>
        let lang_code = code.getAttribute('class') || null;
        if(lang_code){
          let lang = lang_code.split('-')[1] || None;
          // 创建 span 元素，用于显示代码类型
          let span = document.createElement('p');
          span.innerHTML = lang.toUpperCase();
          span.setAttribute('class', 'code-lang');
          code.appendChild(span);
        }
        // 创建一个按钮，用于代码复制
        let button = document.createElement('p');
        button.innerHTML = "<i class='el-icon-document-copy'></i>";
        button.setAttribute('class', 'code-copy');
        // 绑定 click 事件，执行代码复制
        button.onclick = () => this.copy(code_content)
        // 将此元素添加进 code 中
        code.appendChild(button);
      });
    },

    cancelReply: function(){
      this.reply = false;
    },
    pageChange: function(page){
      this.current_page = page;
      this.ajaxInitComment(page);
      document.getElementById('container').scrollIntoView()
    },
    getCommentId: function(el){
      // 获取所回复评论的 id 值，并启动回复模式
      this.reply = true;
      this.replied_comment_id = el.currentTarget.getAttribute('id');
      // 获取所回复用户的用户名，用于 @xxx
      this.replied_user_name = el.currentTarget.previousElementSibling.previousElementSibling.children[0].innerHTML;
      // 滑动至评论组件
      document.getElementById('container').scrollIntoView()
    },

    initSubmitComment: function(){
      let message = document.getElementById('twemoji-textarea').innerHTML;
      message = message.replace(/alt=\"\s*\S*\"/g, '');
      if(!this.reply){
        ajaxGet(
          `http://${this.host}/api/addComment`, {
            user: this.getUserInfo.uid,
            blog: Number(this.id),
            message: message
          }, this.succSubmitComment, this.failSubmitComment
        )
      } else {
        let data = {
          user: this.getUserInfo.uid,
          replied_comment: this.replied_comment_id,
          message: message
        }
        ajaxPost(
          `http://${this.host}/api/addComment`, data,
          this.succSubmitComment, this.failSubmitComment
        )
        // let data = `user=${this.getUserInfo.uid}&replied_comment=${this.replied_comment_id}&message=${message}`;
        // this.post(`http://${this.host}/api/addComment`, data, this.succSubmitComment, this.failSubmitComment);
      }
    },
    succSubmitComment: function(res){
      let data = res.data;
      if(data.code === 1200){
        postMsg('评论发表成功', 'success');
        if(this.reply) {
          this.pageChange(this.current_page);
          // 取消回复模式
          this.reply = false;
        } else {
          this.current_page = 1;
          this.pageChange(1);
        }
        // 清空输入框
        document.getElementById('twemoji-textarea').innerHTML = "";
      } else {
        postMsg(data.msg, 'danger')
      }
    },
    failSubmitComment(e){
      postMsg('评论失败', "danger")
      console.log(e)
    },

    ajaxInitComment: function(page){
      ajaxGet(
        `http://${this.host}/api/showArticleComment/${this.id}`, {
          page: page
        }, this.succGetComment, (e)=>(console.log(e))
      )
    },
    succGetComment: function(res){
      let data = res.data;
      this.total = data.count;
      this.comment = data.results;
    },

    slide: function(){
      let info_column = document.getElementsByClassName("info")[0];
      let span_arrow = document.getElementById('uarrow');
      if(this.canSlideOut){
        if(!this.hasGetInfo)
          this.getAuthorInfoAjax();
        this.hasGetInfo = true;
        info_column.style.width = "20rem";
        span_arrow.style.transform = "rotate(180deg)";
        this.canSlideOut = false;
      } else {
        info_column.style.width = 0;
        span_arrow.style.transform = "rotate(360deg)";
        this.canSlideOut = true;
      }
    },

    getAuthorInfoAjax: function(){
      let params = {'user_name':this.article.creator.user_name};
      ajaxGet(
        `http://${this.host}/api/userInfo`,params,
        this.succGetAuthorInfo, (e)=>(console.log(e))
      )
    },
    succGetAuthorInfo: function(res){
      this.authorInfo = res.data.data[0];
    },

    mark: function(para) {
      return marked(para || '');
    },
    getArticle: function(){
      ajaxGet(
        `http://${this.host}/api/article`,{id: this.id},
        this.succGetArticle, (e)=>(console.log(e))
      )
    },
    succGetArticle: function(res){
      let data = res.data;
      let code = data['code'];
      let msg = data['msg'];
      if(279 === code){
        this.article = data['data'];
      } else {
        postMsg(msg, 'error');
      }
    },

    initGet: function(){
      if(null === this.articles.articles){
        this.getArticle();
      } else {
        let flag = true;
        for(let el of this.articles.articles['results']){
          if(this.id == el['id']){
            this.article = el;
            flag = false
            break;
          }
        }
        if(flag){
          this.getArticle();
        }
      }
    },
    updateClickNum: function(){
      ajaxGet(
        `http://${this.host}/api/clickNum`,{id: this.id},
        ()=>{}, (e)=>{console.log(e)}
      )
    }
  },
  mounted(){
    this.initGet();
    this.ajaxInitComment();
    // 数学公式
    this.$nextTick(function() {
      setTimeout(() => {
        window.MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        this.initMakeCatalog('para');
      }, 2000)
    });
    setTimeout(() => {
      this.addCodeLangToPre('para');
    }, 2000);
    this.updateClickNum()
  },
  watch: {
    '$route' (to, from){
      this.id = to.params.web;
      this.initGet();
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
#article-life {
  background-color: #fff;
  padding: 75px 10px 100px 0;
  line-height: 1.75;
  position: relative;
}
#article-life article {
  width: 900px;
}
#article-life article,
#article-life #article-info {
  padding-left: 250px;
}
#article-life .title {
  font-size: 2em;
  text-align: center;
}
#article-life .para {
  white-space: pre-wrap;
  margin: 5% 0;
}
#article-life .para img {
  display: flex;
  margin: 0.5rem auto;
  max-width: 92%;
  max-height: 500px;
  border-radius: 0.2rem;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
  transition: 0.4s;
}
#article-life .para table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 14px;
  overflow: auto;
}
#article-life .para th {
  padding-bottom: 10px;
  font-weight: 700;
}
#article-life .para th,
#article-life .para td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
  vertical-align: middle;
  font-weight: normal;
}
#article-life .para table > tbody > tr:nth-of-type(odd) {
  background-color: #fafafa;
}
#article-life .para table > tbody > tr:hover {
  background-color: rgb(245,245,245);
}
#article-life .para pre {
    padding: .88889em;
    font-size: 1.2em;
    word-break: normal;
    word-wrap: normal;
    white-space: pre;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background: #f6f6f6;
    border-radius: 4px;
    max-height: 90vh;
}
#article-life .para ol,
#article-life .para ul {
    background: #dbde1f7a;
    padding: 20px 40px;
    border-radius: 4px;
    color: #291c1c;
}
#article-life .para blockquote {
  margin-left: 10px;
  border-left: 7px solid #787f8857;
  background-color: #e1e7e891;
  padding-left: 20px;
  color: gray;
  font-size: 0.9em;
}
#article-life .para h1,
#article-life .para h2,
#article-life .para h3,
#article-life .para h4,
#article-life .para h5,
#article-life .para h6 {
  position: relative;
  border-bottom: 1px dotted rgba(153,153,153,0.5);
}

#article-life .para h1::before,
#article-life .para h2::before,
#article-life .para h3::before,
#article-life .para h4::before,
#article-life .para h5::before,
#article-life .para h6::before {
  content: '';
  position: absolute;
  width: 5px;
  height: 100%;
  top: 0;
  left: -10px;
  background: #27e6f3;
}

#article-life .para a {
  color: #0065ff;
}
#article-life .para a:hover {
  color: #0747A6;
  text-decoration: underline;
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
#article-life .creator-info-button a:hover {
  text-decoration: none;
}
#article-life .code-lang,
#article-life .code-copy {
  position: absolute;
  top: .88889em;
}
#article-life .code-lang  {
  right: 10px;
  color: gray;
}
#article-life .code-copy {
  top: 14px;
  right: 60px;
  color: #4d4d4d;
  background-color: white;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05);
  outline: none;
}

@media screen and (max-width: 800px){
  #article-life {
    padding-right: 50px;
  }

  #article-life article {
    width: 95%;
  }
  #article-life article,
  #article-life #article-info {
    padding: 0 30px;
  }
}
</style>

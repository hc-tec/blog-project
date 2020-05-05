<template>
  <div class="article" id="article-life">
    <article>
      <p class="title">{{ article['title']}}</p>
      <p @click="slide" class="author"><i class="el-icon-user"></i> 创作者: {{ article['creator']['user_name'] }}</p>
      <p><i class="el-icon-date"></i> 创作时间: {{ article['create_time'] }} </p>
      <p><i class="el-icon-view"></i> 阅读次数: {{ article['click_num'] }} </p>

      <!-- <div class="para">{{ article['content'] }}</div> -->
      <div class="para" v-html="mark(article['content'])"></div>
      <el-divider></el-divider>
    </article>

    <div class="catalog">
      <el-popover
        placement="left"
        title="HELP"
        width="200"
        trigger="hover"
        content="点击此按钮可以对目录的显隐进行控制。">
        <el-button
          slot="reference"
          icon="el-icon-warning-outline"
          @click="unshowCatalog"
          circle>
        </el-button>
      </el-popover>
      <ul class="catalog-list">
        <li v-for="(h1v,h1k) in catalog_tree" :key="h1k">
          <a href="" @click.prevent="custormAnchor(h1k.split('~~')[1])">{{ h1k.split('~~')[1] }}</a>
          <ul>
            <li v-for="(h2v,h2k) in h1v" :key="h2k">
              <a href="" @click.prevent="custormAnchor(h2k.split('~~')[1])">{{ h2k.split('~~')[1] }}</a>
              <ul>
                <li v-for="(h3v,h3k) in h2v" :key="h3k">
                  <a href="" @click.prevent="custormAnchor(h3k.split('~~')[1])">{{ h3k.split('~~')[1] }}</a>
                  <ul>
                    <li v-for="(h4v,h4k) in h3v" :key="h4k">
                      <a href="" @click.prevent="custormAnchor(h4k.split('~~')[1])">{{ h4k.split('~~')[1] }}</a>
                      <ul>
                        <li v-for="(h5v,h5k) in h4v" :key="h5k">
                          <a href="" @click.prevent="custormAnchor(h5k.split('~~')[1])">{{ h5k.split('~~')[1] }}</a>
                          <ul>
                            <li v-for="(h6v,h6k) in h5v" :key="h6k">
                              <a href="" @click.prevent="custormAnchor(h6k.split('~~')[1])">{{ h6k.split('~~')[1] }}</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>

      </ul>
    </div>

    <div id="article-info">
      <p><i class="el-icon-data-analysis"></i> 类别: {{ article['category'] }}</p>
      <span><i class="el-icon-price-tag"></i> 标签:</span>

      <span
        v-for="(tag) in article['tags']"
        :key="tag">
        {{ tag }} &nbsp;&nbsp;
      </span>
    </div>

    <div class="creator-info">

      <div class="creator-info-button" @click="slide">
        <span id="uarrow">«</span>
        <!-- «» -->
      </div>
      <div class="info">
        <p>Author-Info</p>
        <div class="cimg-content">
          <img :src="authorInfo['avatar']" />
        </div>
        <p>{{ authorInfo['user_name']}}</p>
        <div class="details">
          <div class="qq">
            <p>QQ</p>
            <p>{{ authorInfo['qq'] }}</p>
          </div>
          <div class="hobby">
            <p>Hobby</p>
            <p v-html="authorInfo['hobby']"></p>
          </div>
          <div class="profile">
            <p>Profile</p>
            <p v-html="authorInfo['profile']"></p>
          </div>
        </div>
        <el-divider></el-divider>

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

    <div class="comments-container" id="container">
      <div class="comment-input-area">
        <template v-if="this.getUserInfo.power.isLogin">
          <p style="color:#00a1d6;" v-show="reply">
            {{ replied_user_name ? `@${replied_user_name}` : '' }}
            <i class="el-icon-circle-close" @click="cancelReply"></i>
          </p>
          <twemoji-textarea
            :emojiData="emojiDataAll()"
            :emojiGroups="emojiGroups()"
            @enterKey="onEnterKey"
            style="width: 80%;float: left;">
          </twemoji-textarea>
          <button
            class="waves-effect"
            @click="initSubmitComment($event)">发布评论</button>
        </template>
        <p v-else>
          <router-link to="/login" style="color:red;">登录</router-link>
          后才可发表评论喔
        </p>
      </div>
      <template v-if="total">
        <ul id="comments-list" class="comments-list">

          <li v-for="com in comment" :key="com.id">
            <div class="comment-main-level">
              <div class="comment-avatar">
                <img :src="com.user.avatar" alt="avatar"></div>
              <div class="comment-box">
                <div class="comment-head">
                  <h6
                    :class="['comment-name', com.user.name === article.creator.user_name ? 'by-author' : '']">
                    <a>{{ com.user.name }}</a>
                  </h6>
                  <span>{{ com.create_time }}</span>
                  <i
                    class="el-icon-s-fold"
                    title="回复"
                    :id="com.id"
                    @click="getCommentId($event)">
                  </i>
                </div>
                <div class="comment-content" v-html="com.message">
                </div>
              </div>
            </div>
            <ul class="comments-list reply-list">
              <li v-for="comm in com.reply" :key="comm.id">

                <div class="comment-avatar">
                  <img :src="comm.user.avatar" alt="avatar">
                </div>

                <div class="comment-box">
                  <div class="comment-head">
                    <h6
                      :class="['comment-name', comm.user.name === article.creator.user_name ? 'by-author' : '']">
                      <a>{{ comm.user.name }}</a>
                    </h6>
                    <span>{{ comm.create_time }}</span>
                    <i class="fa fa-reply"></i>
                    <i class="fa fa-heart"></i>
                  </div>
                  <div class="comment-content" v-html="comm.message">
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>

        <el-pagination
            background
            style="text-align:center;"
            layout="prev, pager, next"
            :total="total/pagi_count*10"
            @current-change="pageChange"
            :current-page.sync="current_page">
        </el-pagination>

      </template>
      <p style="text-align:center;" v-else>还没有人评论，来抢个沙发吧</p>
	  </div>

  </div>
</template>

<script>
import { Divider, Popover, Button, Pagination } from 'element-ui';

import {
  TwemojiTextarea
} from '@kevinfaguiar/vue-twemoji-picker';
import EmojiAllData from '@kevinfaguiar/vue-twemoji-picker/emoji-data/zh/emoji-all-groups.json';
import EmojiDataAnimalsNature from '@kevinfaguiar/vue-twemoji-picker/emoji-data/zh/emoji-group-animals-nature.json';
import EmojiDataFoodDrink from '@kevinfaguiar/vue-twemoji-picker/emoji-data/zh/emoji-group-food-drink.json';
import EmojiGroups from '@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json';

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

      replied_comment_id: -1,
      replied_user_name: '',

      total: 0,      // 总文章数
      pagi_count: 5, // 每页文章数
      current_page: 1,

      h_list: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      catalog_tree: {},
      h_ele_list: [],

      catalog_visibility: false,
    }
  },
  components: {
    'twemoji-textarea': TwemojiTextarea,
    "el-divider": Divider,
    "el-popover": Popover,
    "el-button": Button,
    "el-pagination": Pagination,
  },
  methods: {
    onEnterKey(e) {
      this.initSubmitComment()
    },
    emojiDataAll() {
      return EmojiAllData;
    },
    emojiGroups() {
      return EmojiGroups;
    },
    custormAnchor(id){
      let el = document.getElementById(id);
      el.scrollIntoView();
    },
    unshowCatalog(){
      let catalog = document.getElementsByClassName('catalog-list')[0];
      catalog.style.visibility = this.catalog_visibility ? "visible" : "hidden";
      this.catalog_visibility = !this.catalog_visibility;
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
    h_elementList(parent){
      // 获取文章所有 h1,h2...类型的标签
        let children = parent.children;
        for(let el of children){
            // 如果标签名为标题类型
            if(this.h_list.indexOf(el.localName) !== -1 ){
                this.h_ele_list.push(el)
            }
        }
        return this.h_ele_list
    },
    getElement(el){
        // 获取对应 Id 或 Class 的元素，注意，只能获取class 类元素中的第一个元素
        return document.getElementById(el) || document.getElementsByClassName(el)[0];
    },
    cmp(left, right){
      // 传入参数：left : h 标签名
      //          right: h 标签名
        // 级层关系更小
        if(this.h_list.indexOf(left) > this.h_list.indexOf(right))
            return -1
        // 级层关系相等
        else if(this.h_list.indexOf(left) === this.h_list.indexOf(right))
            return 0
        // 级层关系更大
        else if(this.h_list.indexOf(left) < this.h_list.indexOf(right))
            return 1
    },
    formatKey(h_ele){
        let h_ele_markup_name = h_ele.localName
        return `${h_ele_markup_name[1]}~~${h_ele.getAttribute('id')}`;
    },
    toSameRow(index, h_ele_markup_name){
        let flag = -1;
        for(let i=index-1;i>=0;i--){
            if(-1 === this.cmp(h_ele_markup_name, this.h_ele_list[i].localName)){
                flag = i;
                break;
            }
        }
        return flag;
    },
    getSetOfH_ele(h_ele_list){
      let h_obj = {};
      for(let el of h_ele_list){
        if(!h_obj[el.localName]){
          h_obj[el.localName] = true;
        }
      }
      return Object.keys(h_obj);
    },
    getMaxRowIndex(index){
      for(let i=index+1;i<this.h_ele_list.length;i++){
        if(this.cmp(this.h_ele_list[index].localName,this.h_ele_list[i].localName) <= 0){
          return i
        }
      }
      return -1;
    },
    initMakeCatalog(el){
      let parent = document.getElementsByClassName(el)[0];
      this.h_ele_list = this.h_elementList(parent);
      let row_list = []; // 储存着每层的字典
      let row = 1;       // 初始化极层数

      let first = 0;     // 初始化第一极层首位索引
      let tmp = this.getMaxRowIndex(first)
      let last = tmp === -1 ? this.h_ele_list.length : tmp; // 初始化第一级层最大位索引
      let sum = 0;  // 初始化已选用元素总数
      while(sum < this.h_ele_list.length){
        sum += last - first;
        row_list.push([]);  // 创建一个新层级
        let pres_row_list = row_list[row-1]; // 当前层级字典列表
        let first_formatKey = this.formatKey(this.h_ele_list[first]) // 第一级元素的 formatKey
        this.catalog_tree[first_formatKey] = {}
        pres_row_list.push(this.catalog_tree) // 推入此层级第一级元素
        let pres_dict = pres_row_list[0][first_formatKey]; // 初始化当前的字典，每次迭代必须进行更新
        let chosen_list = this.h_ele_list.slice(first, last);
        let set = this.getSetOfH_ele(chosen_list);  // 获取选中数组的集合，以判断其层级关系
        for(let i=first+1;i<last;i++){
          let pres_h_ele = this.h_ele_list[i];     // 当前的 h 元素
          let pres_h_row = set.indexOf(pres_h_ele.localName); // 读取层级
          let formatKey = this.formatKey(pres_h_ele);
          try{
            pres_row_list[pres_h_row][formatKey] = {};
          }catch(e){
            pres_dict[formatKey] = {}; // 报错即代表在此极层中尚无这级，需要创建
            pres_row_list.push(pres_dict);
          }
          pres_dict = pres_row_list[pres_h_row][formatKey];
        }
        row++;
        first = last;
        tmp = this.getMaxRowIndex(first)
        last = tmp === -1 ? this.h_ele_list.length : tmp;
      }
      this.$forceUpdate()
    },
    cancelReply: function(){
      this.reply = false;
    },
    pageChange: function(page){
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
    submitComment: function(data){
      if(data.code === 1200){
        this.postMsg('评论发表成功', 'success');
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
        this.postMsg(data.msg, 'danger')
      }
    },
    failSubmitComment(e){
      this.postMsg('评论失败', "danger")
      console.log(e)
    },
    initSubmitComment: function(){
      let message = document.getElementById('twemoji-textarea').innerHTML;
      message = message.replace(/alt=\"\s*\S*\"/g, '');
      if(!this.reply){
        this.ajax(`http://${this.host}/api/addComment`,{
          user: this.getUserInfo.uid,
          blog: Number(this.id),
          message: message
        }, this.submitComment, this.failSubmitComment)
      } else {
        let data = `user=${this.getUserInfo.uid}&replied_comment=${this.replied_comment_id}&message=${message}`;
        this.post(`http://${this.host}/api/addComment`, data, this.submitComment, this.failSubmitComment);
      }
    },
    getComment: function(data){
      this.total = data.count;
      this.comment = data.results;
    },
    failGetComment: function(e){
      console.log(e);
    },
    ajaxInitComment: function(page){
      this.ajax(`http://${this.host}/api/showArticleComment/${this.id}`,{
        page: page
      }, this.getComment, this.failGetComment)
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
      this.ajax(`http://${this.host}/api/userInfo`,params, this.getAuthorInfo, this.failToGetAuthorInfo)
    },
    getAuthorInfo: function(data){
      this.authorInfo = data.data[0];
    },
    failToGetAuthorInfo: function(e){
      console.log(e);
    },
    mark: function(para) {
      return marked(para || '');
    },
    getArticle: function(){
      this.axios
      .get(`http://${this.host}/api/article`,{
        params: {
          id: this.id
        }
      })
      .then(response => {
        let data = response.data;
        let code = data['code'];
        let msg = data['msg'];
        if(279 === code){
          this.article = data['data'];
        } else {
          this.postMsg(msg, 'error');
        }
      })
      .catch(e => console.log(e))
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
      this.ajax(`http://${this.host}/api/clickNum`,{
        id: this.id,
      }, ()=>{}, (e)=>{console.log(e)})
    }
  },
  mounted(){
    this.initGet();
    this.ajaxInitComment();
    // 数学公式
    this.$nextTick(function() {
      setTimeout(() => {
        window.MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      }, 2000)
    });
    setTimeout(() => {
      this.addCodeLangToPre('para');
      this.initMakeCatalog('para');
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
.comments-container {
	margin: 60px auto 15px;
	width: 768px;
  padding: 100px;
  background: #e3e3e366;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

.comments-container h1 {
	font-size: 36px;
	color: #283035;
	font-weight: 400;
}

.comments-container h1 a {
	font-size: 18px;
	font-weight: 700;
}

.comments-list {
	margin-top: 30px;
	position: relative;
}

.comments-list:before {
	content: '';
	width: 2px;
	height: 100%;
	background: #c7cacb;
	position: absolute;
	left: 32px;
	top: 0;
}

.comments-list:after {
	content: '';
	position: absolute;
	background: #c7cacb;
	bottom: 0;
	left: 27px;
	width: 7px;
	height: 7px;
	border: 3px solid #dee1e3;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	border-radius: 50%;
}

.reply-list:before, .reply-list:after {display: none;}
.reply-list li:before {
	content: '';
	width: 60px;
	height: 2px;
	background: #c7cacb;
	position: absolute;
	top: 25px;
	left: -55px;
}


.comments-list li {
	margin-bottom: 15px;
	display: block;
	position: relative;
}

.comments-list li:after {
	content: '';
	display: block;
	clear: both;
	height: 0;
	width: 0;
}

.reply-list {
	padding-left: 88px;
	clear: both;
	margin-top: 15px;
}

.comments-list .comment-avatar {
	width: 65px;
	height: 65px;
	position: relative;
	z-index: 0;
	float: left;
	border: 3px solid #FFF;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
	-webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.2);
	-moz-box-shadow: 0 1px 2px rgba(0,0,0,0.2);
	box-shadow: 0 1px 2px rgba(0,0,0,0.2);
	overflow: hidden;
}

.comments-list .comment-avatar img {
	width: 100%;
	height: 100%;
}

.reply-list .comment-avatar {
	width: 50px;
	height: 50px;
}

.comment-main-level:after {
	content: '';
	width: 0;
	height: 0;
	display: block;
	clear: both;
}

.comments-list .comment-box {
	width: 680px;
	float: right;
	position: relative;
	-webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.15);
	-moz-box-shadow: 0 1px 1px rgba(0,0,0,0.15);
	box-shadow: 0 1px 1px rgba(0,0,0,0.15);
}

.comments-list .comment-box:before, .comments-list .comment-box:after {
	content: '';
	height: 0;
	width: 0;
	position: absolute;
	display: block;
	border-width: 10px 12px 10px 0;
	border-style: solid;
	border-color: transparent #FCFCFC;
	top: 8px;
	left: -11px;
}

.comments-list .comment-box:before {
	border-width: 11px 13px 11px 0;
	border-color: transparent rgba(0,0,0,0.05);
	left: -12px;
}

.reply-list .comment-box {
	width: 610px;
}
.comment-box .comment-head {
	background: #FCFCFC;
	padding: 10px 12px;
	border-bottom: 1px solid #E5E5E5;
	overflow: hidden;
	-webkit-border-radius: 4px 4px 0 0;
	-moz-border-radius: 4px 4px 0 0;
	border-radius: 4px 4px 0 0;
}

.comment-box .comment-head i {
	float: right;
	margin-left: 14px;
	position: relative;
	top: 2px;
	color: #A6A6A6;
	cursor: pointer;
	-webkit-transition: color 0.3s ease;
	-o-transition: color 0.3s ease;
	transition: color 0.3s ease;
}

.comment-box .comment-head i:hover {
	color: #03658c;
}

.comment-box .comment-name {
	color: #283035;
	font-size: 14px;
	font-weight: 700;
	float: left;
	margin-right: 10px;
}

.comment-box .comment-name a {
	color: #283035;
}

.comment-box .comment-head span {
	float: left;
	color: #999;
	font-size: 13px;
	position: relative;
	top: 1px;
}

.comment-box .comment-content {
	background: #FFF;
	padding: 12px;
	font-size: 15px;
	color: #595959;
	-webkit-border-radius: 0 0 4px 4px;
	-moz-border-radius: 0 0 4px 4px;
	border-radius: 0 0 4px 4px;
  white-space: pre-line;
}
.comment-box .comment-content > img {
  max-width: 92%;
  max-height: 300px;
}
.comment-box .emoji {
  height: 25.6px;
}

.comment-box .comment-name.by-author, .comment-box .comment-name.by-author a {color: #03658c;}
.comment-box .comment-name.by-author:after {
	content: 'author';
	background: #2ad6e2;
	color: #FFF;
	font-size: 12px;
	padding: 3px 5px;
	font-weight: 700;
	margin-left: 10px;
	-webkit-border-radius: 3px;
	-moz-border-radius: 3px;
	border-radius: 3px;
}
.comment-input-area {
  width: 100%;
}
.comment-input-area textarea {
  width: 80%;
  display: inline-block;
  box-sizing: border-box;
  background-color: #f4f5f7;
  border: 1px solid #e5e9ef;
  overflow: auto;
  border-radius: 4px;
  color: #555;
  height: 65px;
  transition: 0s;
  padding: 5px 10px;
  line-height: normal;
  outline: none;
}
.comment-input-area button {
  width: 15%;
  height: 65px;
  margin-left: 5%;
  padding: 4px 15px;
  font-size: 14px;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  min-width: 60px;
  vertical-align: top;
  cursor: pointer;
  background-color: #66ccff;
  border: 1px solid #66ccff;
  transition: .1s;
  user-select: none;
  outline: none;
}
.comment-input-area:hover textarea {
  background-color: #fff;
  border-color: #66ccff;
}
#article-life .catalog {
  position: fixed;
  right: 40px;
  top: 10%;
  max-width: 250px;
  max-height: 80%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#article-life .catalog a {
  color: #252724;
}
#article-life .catalog a:hover {
  color: #97dffd;
}
#article-life .catalog > ul > li > ul > li {
  margin-left: 10px;
}
#article-life .catalog > ul > li > ul > li > ul > li {
  margin-left: 10px;
}
#article-life .catalog > ul > li > ul > li > ul > li > ul > li {
  margin-left: 10px;
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
#twemoji-textarea {
  outline: none;
}
@media screen and (max-width: 800px){
  .comments-container {
		width: 480px;
	}

	.comments-list .comment-box {
		width: 450px;
	}

	.reply-list .comment-box {
		width: 320px;
  }
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
  .comments-container {
    width: 90%;
    padding: 50px;
  }
  #article-life .catalog {
    display: none;
  }
}
@media screen and (max-width: 500px){
  .comment-input-area button {
    margin: 0;
  }
  .comments-list .comment-box {
    width: 100%;
  }
  .reply-list .comment-box {
    width: 90%;
  }
}
</style>

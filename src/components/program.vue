<template>
  <div id="program">

    <div class="article-content">
      <div id="part">
        <div class="content" v-for="(essay,index) in data" :key="essay['title']">
          <div class="program-content">

              <div id="avatar">
                <img :src="essay['avatar']"/>
              </div>

              <span
                class="comment_num"
                title="评论数">
                <i class="el-icon-chat-line-square"> </i>
                {{ essay['comment_num'] }}
              </span>

              <p class="title">{{ essay['title'] }}</p>

              <div class="article-info">
                <span
                  title="创作时间">
                  <i class="el-icon-date"></i>
                  {{ essay['create_time'] }} •
                </span>

                <span
                  style="font-family:Constantia, 华文中宋, 宋体, serif!important;"
                  :title="'类别:'+essay['category']">
                  <i class="el-icon-data-analysis"></i>
                  {{ essay['category'] }} •
                </span>

                <span
                  title="阅读次数">
                  <i class="el-icon-view"></i>
                  {{ essay['click_num'] }}
                </span>

                <span
                  v-for="(tag) in essay['tags']"
                  :key="tag"
                  :title="tag">
                  • <i class="el-icon-price-tag"></i>
                  {{ tag }}
                </span>
              </div>

              <div v-html="mark(essay['content'])" class="markdown"></div>

              <div class="tagGroup">
                <span
                  id="creator"
                  title="创作者">
                  <i class="el-icon-user"></i>
                  {{ essay['creator']['user_name'] }}
                </span>
              </div>

              <el-dropdown
                class="work-btn"
                v-if="getUserInfo.power.isLogin">
                <span class="el-dropdown-link">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu>

                  <el-dropdown-item :id="index+'-'+essay['id']" class="waves-effect">
                    <span
                      @click="editArticle($event)"
                      style="color: #409eff;">
                      <i class="el-icon-edit"> 编辑</i>
                    </span>
                  </el-dropdown-item>

                  <el-dropdown-item class="waves-effect">
                    <span
                      @click="delArticle($event)"
                      style="color: red;"
                      v-if="getUserInfo.power.delArticle">
                      <i class="el-icon-delete"> 删除</i>
                    </span>
                  </el-dropdown-item>

                </el-dropdown-menu>
              </el-dropdown>

              <div
                class="lookmore waves-effect waves-float"
                @click="toArticle(essay.id)">
                查看更多<i class="el-icon-d-arrow-right"></i>
                <!-- <router-link :to="'/web/'+essay['id']">

                </router-link> -->
              </div>


            </div>
          </div>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total/pagi_count*10"
          @current-change="pageChange"
          :current-page.sync="current_page">
        </el-pagination>
    </div>

    <div class="article-class">

      <div class="article-category">
        <h3>类别</h3>
        <div class="category">
          <p @click="getAllArticlesByCategory">> 第一页</p>
          <p
            v-for="(cat,index) in category"
            :key="cat"
            @click="getArticleByCategory(index)">
            > {{ cat }}
          </p>
        </div>
      </div>

      <div class="article-tags">
        <h3>标签</h3>
        <div class="tag">
          <el-button
            class="waves-effect"
            size="mini"
            v-for="(tag,index) in tags"
            :key="tag"

            @click="getArticleByTag(index)">
            {{ tag }}
          </el-button>
        </div>
      </div>

      <div class="article-update" v-if="this.update_or_modify_articles">
        <h3>最近修改文章：</h3>
        <div class="update_modify">
          <div
            v-for="article in this.update_or_modify_articles"
            :key="article.title">
            <router-link
              :to="'/web/'+article.id">
              {{ article.title }}
            </router-link>
            <span style="float:right">{{ article.modify_time }}</span>
          </div>
        </div>
      </div>

      <div id="subscribe">
        <el-button
          class="waves-effect"
          v-if="!this.getUserInfo.uisSubscribe"
          icon="el-icon-message"
          @click="subscribe">邮箱订阅</el-button>
        <!-- <el-button
          v-else
          icon="el-icon-message"
          @click="subscribe">取消订阅</el-button> -->
      </div>

    </div>
    {{ updateMathJax() }}

  </div>

</template>


<script>
import {Dropdown, DropdownMenu, DropdownItem, Button, Pagination} from 'element-ui';
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
  components: {
    "el-dropdown": Dropdown,
    "el-dropdown-menu": DropdownMenu,
    "el-dropdown-item": DropdownItem,
    "el-button": Button,
    "el-pagination": Pagination
  },
  data(){
    return {

      data: {},
      active: 1,
      flag: true,
      total: 0,      // 总文章数
      pagi_count: 5, // 每页文章数
      next: '',
      prev: '',
      current_page: 1,

      tags: [],
      category: [],

      color: ['primary', 'success', 'info', 'warning', 'danger'],

      delArticleId: -1,
    }
  },
  methods: {
    toArticle: function(id){
      this.$router.push(`/web/${id}`);
    },
    subscribe: function(){
      // 若为登录用户
      if(this.getUserInfo.power.isLogin){
        this.$confirm('确定订阅以了解博文更新消息吗？', '订阅框框', {
          confirmButtonText: '确定订阅',
          cancelButtonText: '取消订阅',
        }).then(() => {
          this.ajax(`http://${this.host}/api/subscribe`,
                  {'email':`${this.getUserInfo.uqq}@qq.com`},
                  this.subscribeSuccess, this.subscribeError)
        })
      } else {
        this.$prompt('订阅有助于您及时了解博文更新消息，输入邮箱即可订阅', '订阅框框', {
          confirmButtonText: '确定订阅',
          cancelButtonText: '取消订阅',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({value}) => {
          this.ajax(`http://${this.host}/api/subscribe`,
                    params={'email':value},
                    this.subscribeSuccess, this.subscribeError)
        })
      }
    },
    subscribeSuccess: function(data){
      if(299 === data['code']){
        this.postMsg(data['msg'], 'success');
      } else {
        this.postMsg(data['msg'], 'danger');
      }
    },
    subscribeError: function(e){
      console.log(e);
    },
    updateMathJax: function(){
      setTimeout(() => {
        window.MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      },2000)
    },
    getAllArticlesByCategory: function(){
      this.getArticle(1);
    },
    getArticleByCategory: function(index){
      let name = this.category[index];
      this.axios
        .get(`http://${this.host}/api/categoryArticle`,{
          params: {
            name: name
          }
        }).then(response => {
          this.data = response.data['data'] || null;
        }).catch(e => console.log(e))
    },
    getArticleByTag: function(index){
      let name = this.tags[index];
      this.axios
        .get(`http://${this.host}/api/tagArticle`,{
          params: {
            name: name
          }
        }).then(response => {
          this.data = response.data['data'] || null;
        }).catch(e => console.log(e))
    },
    mark: (para) => {
      return marked((para.slice(0, 140) + '......') || '')
    },
    editArticle: function(el){
      let index = el.currentTarget.parentNode.getAttribute('id').split('-')[0];
      let article = this.data[index];
      Object.keys(article).forEach(key => {
        this.editArticleDetail[key] = article[key];
      })
      this.editArticleDetail.isEdit = true;
      this.$router.push('/write');
    },
    delArticle: function(el){
      let [index,id] = el.currentTarget.parentNode.parentNode.children[0].getAttribute('id').split('-');
      this.delArticleId = id;
      this.$confirm('真的要把我删掉 mia ？, 是否继续?', '删除框框', {
        confirmButtonText: '狠心',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        this.axios
          .get(`http://${this.host}/api/delArticle`,{
            params: {
              id: this.delArticleId
            }
          }).then(response => {
            let data = response.data;
            let code = data['code'];
            let msg = data['msg'];
            if(281 === code){
              this.data.splice(index, 1);
              this.postMsg(msg, 'success');
            } else {
              this.postMsg(msg, 'error');
            }
          })
      })
    },
    modiPara: (para) => {
      return para.slice(0, 100) + "......"
    },
    source: (sour) => {
      if("原创" === sour)
        return "<span class='source'>原创</span>"
      else
        return `<span class="other">${sour}</span>`
    },
    moveEnter: (el) => {
      let childList = el.currentTarget.children
      let len = childList.length
      let a = childList[len-1]
      a.style.top = 0
    },
    moveLeave: (el) => {
      let childList = el.currentTarget.children
      let len = childList.length
      let a = childList[len-1]
      a.style.top = "-100px"
    },
    navModi: (el) => {
      let ele = el.currentTarget
      ele.children[0].classList.add("activeSpan")
    },
    navCut: (el) => {
      let ele = el.currentTarget
      ele.children[0].classList.remove("activeSpan")
    },
    navGetLink: (el) => {
      let ele = el.currentTarget
      let archorId = ele.getAttribute('class')
      document.getElementById(archorId).scrollIntoView()
      // ele.classList.add("active")
      // ele.children[0].classList.add("activeSpan")
      // //兄弟节点清楚样式
      // var p = ele.parentNode.children
      // for(var i =0,pl= p.length;i<pl;i++) {
      //   if(p[i] !== ele) {
      //     p[i].classList.remove("active")
      //     p[i].children[0].classList.remove('activeSpan')
      //   }
      // }
    },
    scroll: function(){
      if(this.flag){
        this.flag = false
        var liFlag = false
        var eleFlag = null
        let divParent = document.getElementById("part")

        let childList = divParent.querySelectorAll("p")
        let ulParent = document.getElementsByClassName("navUl")
        let lichildList = ulParent[0].children
        let pList = []
        let bodyTop = window
        //获取所有匹配的 p 元素
        for(let j=0;j<childList.length;j++){
          let id = childList[j].getAttribute("id")
          if(id !== null)
            pList.push(childList[j])
        }
        let currentScrollPosition = window.pageYOffset
        for(let p of pList){
          if(30 >= (p.offsetTop-currentScrollPosition)){
            let className = p.id
            let li = document.getElementsByClassName(className)

            li[0].classList.add("active")
            li[0].children[0].classList.add("activeSpan")
            liFlag = true
            eleFlag = li[0]
          }
          if(liFlag){
            for(let li of lichildList){
              if(li !== eleFlag){
                li.classList.remove("active")
                li.children[0].classList.remove("activeSpan")
              }
            }
          }
        }
        var se = setInterval(() => {
          this.flag = true
          clearInterval(se)
        }, 0);
      }
    },
    pageChange: function(page){
      this.getArticle(page);
    },
    getArticle: function(page){
      this.axios
        .get(`http://${this.host}/api/articles`, {
          params: {
            page: page
          }
        })
        .then(response => {
          this.total = response.data['count'] || 0;
          this.data = response.data['results'] || {};
          this.next = response.data['next'] || null;
          this.prev = response.data['previous'] || null;
          response.data['current_page'] = page;
          this.articles.articles = response.data || null;
        })
      window.scrollTo(0, 0);
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
    getUpdateOrModifyArticle: function(){
      this.axios.get(`http://${this.host}/api/updateArticle`)
        .then(response => {
          this.update_or_modify_articles = response.data.data;
          this.$forceUpdate();
        })
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
  mounted(){
    if(this.articles.articles === null || this.articles.isWrite){
      this.getArticle(1);
      this.articles.isWrite = false;
    } else {
      this.total = this.articles.articles['count'] || 0;
      this.data = this.articles.articles['results'] || {};
      this.next = this.articles.articles['next'] || null;
      this.prev = this.articles.articles['previous'] || null;
      this.current_page = this.articles.articles['current_page'];
    }
    this.canGetCategory();
    this.canGetTags();
    this.getUpdateOrModifyArticle();
  },
}
</script>

<style>
#program .work-btn {
  position: absolute;
  top: 30px;
  right: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  color: #00a7e0;
  cursor: pointer;
}

#program #part {
  width: 70%;
}
#program {
  display: flex;
  width: 100%;
}
#program .article-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;

}
#program .content {
  margin-bottom: 80px;
  position: relative;
  background-color: #fff;
  border-radius: 10px;
}
#program .content > p:nth-child(1) {
  font-size: 2em;
  font-family: Georgia, serif;
  font-style: italic;
  margin-bottom: 5%;
}
#program .title {
  text-align: center;
  font-size: 2em;
  margin-bottom: 3%;
  margin-top: 30px;
  font-weight: bold;
}
#program .program-content {
  padding: 30px 30px;
  position: relative;
  transition: all .8s;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

#program .lookmore {
  text-align: center;
  width: 150px;
  margin: 0 auto;
  background: #97dffd;
  color: #fff;
  font-size: 1.2em;
  padding: 1px 15px;
  border-radius: 5px;
  line-height: 2;
  transition: all .3s;
}

/* #program .program-content > div > a:hover {
  color: #000;
} */

#program .tagGroup {
  display: flex;
}
#program .tagGroup > span {
  margin-right: 10px;
}
#program .markdown {
  margin: 10px;
  white-space: pre-wrap;
}
#program .article-class {
  width: 25%;
  border-radius: 5px;
  background-color: white;
  padding: 20px 10px;
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
#program .article-class > div {
  margin-bottom: 20px;
}
#program .article-class h3 {
  margin-left: 30px;
  margin-bottom: 20px;
  position: relative;
}
#program .article-class h3::before {
  content: '';
  position: absolute;
  width: 5px;
  height: 100%;
  top: 0;
  left: -10px;
  background: #27e6f3;
}
#program .category {
  display: flex;
  align-items: center;
  flex-direction: column;
}
#program .category > p {
  cursor: pointer;
}
#program .category > p:hover {
  color: #409eff;
}
#program .tag {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
#program .tag > button {
  width: 30%;
  margin-left: 0;
  margin-bottom: 5px;
}
#program .content .markdown img {
  display: flex;
  margin: 0.5rem auto;
  max-width: 92%;
  max-height: 500px;
  border-radius: 0.2rem;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
  transition: 0.4s;
}
#program .markdown pre {
  margin: 1.4em 0;
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
#program .markdown blockquote {
  margin-left: 10px;
  border-left: 7px solid #787f8857;
  background-color: #e1e7e891;
  padding-left: 20px;
  color: gray;
  font-size: 0.9em;
}
#program .markdown h1,
#program .markdown h2,
#program .markdown h3,
#program .markdown h4,
#program .markdown h5,
#program .markdown h6 {
  position: relative;
  border-bottom: 1px dotted rgba(153,153,153,0.5);
}

#program .markdown h1::before,
#program .markdown h2::before,
#program .markdown h3::before,
#program .markdown h4::before,
#program .markdown h5::before,
#program .markdown h6::before {
  content: '';
  position: absolute;
  width: 5px;
  height: 100%;
  top: 0;
  left: -10px;
  background: #27e6f3;
}
#program .markdown ol,
#program .markdown ul {
    background: #dbde1f7a;
    padding: 20px 40px;
    border-radius: 4px;
    color: #291c1c;
}
#program .update_modify {
  padding: 0 10px;
}
#program .update_modify a {
  color: #409eff;
}
#subscribe {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
#avatar {
  position: absolute;
  width: 70px;
  height: 70px;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);

}
#avatar > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  padding: 4px;
  background-color: #fff;
}
#program #creator {
  position: absolute;
  left: -16px;
  top: 30px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
  background-color: #97dffd;
  margin: 5px 0 15px 2px;
  font-size: 14px;
  border-radius: 0 4px 4px 0;
  display: inline-block;
  padding: 7px 11px 7px 32px;
  line-height: 1;
}
#program #creator::after {
  position: absolute;
  content: "";
  top: 100%;
  left: 0;
  border-top: 0 solid transparent;
  border-right-width: 1em;
  border-right-color: #2b2525;
  border-right-style: solid;
  border-bottom: 1em solid transparent;
  border-left: 0 solid transparent;
  width: 0;
  height: 0;
}
#program .article-info {
  text-align: center;
  margin-bottom: 50px;
}
#program .article-info span {
  color: red;
}
#program .article-info span:nth-child(1) {
  color: #00a7e0;
}
#program .article-info span:nth-child(2) {
  color: black;
}
#program .article-info span:nth-child(3) {
  color: #67C23A;
}
#program .el-dropdown-link {
  font-size: 2em;
}
#program .comment_num {
  position: absolute;
  bottom: 10px;
  right: 30px;
}
@media screen and (max-width: 800px){
  .article-class {
    display: none;
  }
  #program .article-content,
  #program #part {
    width: 100%;
  }
  #program .article-content {
    padding-bottom: 100px;
  }
  #program .content {
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>

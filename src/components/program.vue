<template>
  <div id="program">
    <!-- 博文缩略页组件 -->
    <!-- 页面左侧信息：几篇文章的缩略展示 -->
    <div class="article-content">
      <div id="part">
        <!-- 文章展示 -->
        <article-display
          v-for="(essay,index) in data"
          :key="essay['title']"
          :essay="essay"
          :index="index"
          @mark="mark($event)"
          @toArticle="toArticle($event)"
          @delArticle="delArticle($event)"
          @editArticle="editArticle($event)">
        </article-display>

        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total/pagi_count*10"
          @current-change="pageChange"
          :current-page.sync="current_page">
        </el-pagination>
      </div>
    </div>

    <!-- 页面右侧信息：类别、标签等 -->
    <div class="article-class">
      <!-- 类别 -->
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
      <!-- 标签 -->
      <div class="article-tags">
        <h3>标签</h3>
        <div class="tag">
          <el-button
            class="waves-effect"
            size="mini"
            v-for="(tag,index) in tags"
            :key="tag"

            @click="initGetArticleByTag(index)">
            {{ tag }}
          </el-button>
        </div>
      </div>
      <!-- 最近更新文章 -->
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
      <!-- 邮箱订阅 -->
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
import articleDisplay from './article-display';
import { Dropdown, DropdownMenu, DropdownItem, Button, Pagination } from 'element-ui';
import { ajaxPost, ajaxGet, elconfirm, elprompt, postMsg } from '../elem_compo_encap'


export default {
  components: {
    "el-dropdown": Dropdown,
    "el-dropdown-menu": DropdownMenu,
    "el-dropdown-item": DropdownItem,
    "el-button": Button,
    "el-pagination": Pagination,
    "article-display": articleDisplay,
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
        const title = '订阅框框';
        const tip_text = '确定订阅以了解博文更新消息吗？';
        elconfirm(
          title, tip_text,
          "", this.initSubscribe,
          (e)=>{}
        )
      } else {
        const title = '订阅框框';
        const tip_text = '订阅有助于您及时了解博文更新消息，输入邮箱即可订阅';
        elprompt(
          title, tip_text,
          this.initAnnoySubscribe, (e)=>(console.log(e)),
          false, {
            confirmButtonText: '确定订阅',
            cancelButtonText: '取消订阅',
            inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            inputErrorMessage: '邮箱格式不正确'
          }
        )
      }
    },
    initSubscribe: function(){
      ajaxGet(
        `http://${this.host}/api/subscribe`, {
          'email':`${this.getUserInfo.uqq}@qq.com`
        },
        this.subscribeSuccess, (e)=>(console.log(e))
      )
    },
    initAnnoySubscribe: function(value){
      ajaxGet(
        `http://${this.host}/api/subscribe`, {'email':value},
        this.subscribeSuccess, this.subscribeError
      )
    },
    subscribeSuccess: function(res){
      let data = res.data;
      if(299 === data['code']){
        postMsg(data['msg'], 'success');
      } else {
        postMsg(data['msg'], 'danger');
      }
    },
    updateMathJax: function(){
      setTimeout(() => {
        window.MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      },2000)
    },
    getAllArticlesByCategory: function(){
      this.initGetArticle(1);
    },
    getArticleByCategory: function(index){
      let name = this.category[index];
      ajaxGet(
        `http://${this.host}/api/categoryArticle`,{name: name},
        this.succGetArticleByCategory, (e)=>(console.log(e))
      )
    },
    succGetArticleByCategory: function(res){
      this.data = res.data['data'] || null;
    },
    initGetArticleByTag: function(index){
      let name = this.tags[index];
      ajaxGet(
        `http://${this.host}/api/tagArticle`,{name: name},
        this.succGetArticleByCategory, (e)=>(console.log(e))
      )
    },
    succGetArticleByTag: function(res){
      this.data = response.data['data'] || null;
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

      const title = '删除框框';
      const tip_text = '真的要把我删掉 mia ？, 是否继续?';
      elconfirm(
        title, tip_text,
        [index], this.initDelArticle,
        (e)=>(console.log(e),
        false, {
          confirmButtonText: '狠心',
          cancelButtonText: '取消',
          type: 'danger'
        })
      )
    },
    initDelArticle: function(){
      ajaxGet(
        `http://${this.host}/api/delArticle`,{id: this.delArticleId},
        this.succDelArticle, (e)=>(console.log(e)), arguments
      )
    },
    succDelArticle: function(res){
      let index = arguments[1];
      let data = res.data;
      let code = data['code'];
      let msg = data['msg'];
      if(281 === code){
        this.data.splice(index, 1);
        postMsg(msg, 'success');
      } else {
        postMsg(msg, 'error');
      }
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
    pageChange: function(page){
      this.initGetArticle(page);
    },
    initGetArticle: function(page){
      ajaxGet(
        `http://${this.host}/api/articles`,{page: page},
        this.succGetArticle, (e)=>(console.log(e)), arguments
      )
      window.scrollTo(0, 0);
    },
    succGetArticle: function(res){
      let page = arguments[1];
      this.total = res.data['count'] || 0;
      this.data = res.data['results'] || {};
      this.next = res.data['next'] || null;
      this.prev = res.data['previous'] || null;
      res.data['current_page'] = page;
      this.articles.articles = res.data || null;
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
    initGetUpdateOrModifyArticle: function(){
      ajaxGet(
        `http://${this.host}/api/updateArticle`, {},
        this.succGetUpdateOrModifyArticle, (e)=>(console.log(e))
      )
    },
    succGetUpdateOrModifyArticle: function(res){
      this.update_or_modify_articles = res.data.data;
      this.$forceUpdate();
    },
    initGetCategory: function(){
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
    canGetTags: function(){
      if(null === this.articles.tags){
        this.initGetTag();
      } else {
        this.tags = this.articles.tags;
      }
    },
    canGetCategory: function(){
      if(null === this.articles.category){
        this.initGetCategory();
      } else {
        this.category = this.articles.category;
      }
    }
  },
  mounted(){
    if(this.articles.articles === null || this.articles.isWrite){
      this.initGetArticle(1);
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
    this.initGetUpdateOrModifyArticle();
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

#program .tagGroup {
  display: flex;
}
#program .tagGroup > span {
  margin-right: 10px;
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

@media screen and (max-width: 800px){
  .article-class {
    display: none;
  }
  #program #part {
    width: 100%;
  }
  #program .article-content {
    width: 100%;
  }
  #program .article-content {
    padding-bottom: 100px;
  }
}
</style>

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
          @editArticle="editArticle($event)"
          @stickyArticle="stickyArticle">
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
          <p @click="getAllArticlesByCategory">总数
            <el-tag> {{ total }}</el-tag>
          </p>
          <p
            v-for="(cat,index) in category"
            :key="cat.name"
            @click="initGetArticleByCategory(index)">
            {{ cat.name }}
            <el-tag> {{ cat.num }}</el-tag>
          </p>
        </div>
      </div>
      <!-- 标签 -->
      <div class="article-tags">
        <h3>标签</h3>
          <div
            class="tag">
            <div
              v-for="(tag,index) in tags"
              :key="tag.name">
              <el-button
                class="waves-effect"
                size="mini"
                @click="initGetArticleByTag(index)">
                {{ tag.name }}
              </el-button>
              <el-tag type="info">{{ tag.num }}</el-tag>
            </div>
        </div>
      </div>
      <!-- 标签云 -->
      <div class="tag-cloud-2">
        <h3>标签云  <a @click="startCloud()" id="refresh-tag-cloud">刷新标签云</a></h3>
        <tag-cloud
          ref="cloud"
          :tags="tags"
          @initGetArticleByTag="initGetArticleByTag($event)">
        </tag-cloud>
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
            <br /><br />
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
import articleDisplay from './article-display'
import tagCloud from './tagCloud'
import { Dropdown, DropdownMenu, DropdownItem, Button, Pagination, Tag } from 'element-ui'
import { ajaxPost, ajaxGet, elconfirm, elprompt, postMsg, ajaxPatch, ajaxDel } from '../elem_compo_encap'
import { STICKY_ARTICLE } from '../api'
import { genericError } from '../func'
export default {
  components: {
    'el-dropdown': Dropdown,
    'el-dropdown-menu': DropdownMenu,
    'el-dropdown-item': DropdownItem,
    'el-button': Button,
    'el-pagination': Pagination,
    'article-display': articleDisplay,
    'el-tag': Tag,
    'tag-cloud': tagCloud
  },
  data () {
    return {

      data: {},
      active: 1,
      flag: true,
      total: 0, // 总文章数
      pagi_count: 5, // 每页文章数
      next: '',
      prev: '',
      current_page: 1,

      tags: [],
      category: [],

      color: ['primary', 'success', 'info', 'warning', 'danger'],

      delArticleId: -1
    }
  },
  methods: {
    startCloud: function () {
      this.$refs.cloud.startCloud()
    },
    toArticle: function (id) {
      this.$router.push(`/web/${id}`)
    },
    subscribe: function () {
      // 若为登录用户
      if (this.getUserInfo.power.isLogin) {
        const title = '订阅框框'
        const tip_text = '确定订阅以了解博文更新消息吗？'
        elconfirm(
          title, tip_text,
          '', this.initSubscribe,
          (e) => {}
        )
      } else {
        const title = '订阅框框'
        const tip_text = '订阅有助于您及时了解博文更新消息，输入邮箱即可订阅'
        elprompt(
          title, tip_text,
          this.initAnnoySubscribe, (e) => (console.log(e)),
          false, {
            confirmButtonText: '确定订阅',
            cancelButtonText: '取消订阅',
            inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            inputErrorMessage: '邮箱格式不正确'
          }
        )
      }
    },
    initSubscribe: function () {
      ajaxGet(
        `http://${this.host}/api/subscribe`, {
          email: `${this.getUserInfo.uqq}@qq.com`
        },
        this.subscribeSuccess, (e) => (console.log(e))
      )
    },
    initAnnoySubscribe: function (value) {
      ajaxGet(
        `http://${this.host}/api/subscribe`, { email: value },
        this.subscribeSuccess, this.subscribeError
      )
    },
    subscribeSuccess: function (res) {
      const data = res.data
      if (data.code === 299) {
        postMsg(data.msg, 'success')
      } else {
        postMsg(data.msg, 'danger')
      }
    },
    updateMathJax: function () {
      setTimeout(() => {
        window.MathJax.Hub.Queue(['Typeset', MathJax.Hub])
      }, 2000)
    },
    getAllArticlesByCategory: function () {
      this.initGetArticle(1)
    },
    initGetArticleByCategory: function (index) {
      const name = this.category[index].name
      ajaxGet(
        `http://${this.host}/api/categoryArticle`, { name: name },
        this.succGetArticleByCategory, (e) => (console.log(e))
      )
    },
    succGetArticleByCategory: function (res) {
      this.data = res.data.data || null
    },
    initGetArticleByTag: function (index) {
      const name = this.tags[index].name
      ajaxGet(
        `http://${this.host}/api/tagArticle`, { name: name },
        this.succGetArticleByCategory, (e) => (console.log(e))
      )
    },
    succGetArticleByTag: function (res) {
      this.data = response.data.data || null
    },
    editArticle: function (el) {
      const index = el.currentTarget.parentNode.getAttribute('id').split('-')[0]
      const article = this.data[index]
      Object.keys(article).forEach(key => {
        this.editArticleDetail[key] = article[key]
      })
      this.editArticleDetail.isEdit = true
      this.$router.push('/write')
    },
    delArticle: function (el) {
      const [index, id] = el.currentTarget.parentNode.parentNode.children[0].getAttribute('id').split('-')
      this.delArticleId = id

      const title = '删除框框'
      const tip_text = '真的要把我删掉 mia ？, 是否继续?'
      elconfirm(
        title, tip_text,
        [index], this.initDelArticle,
        (e) => (console.log(e),
        false, {
          confirmButtonText: '狠心',
          cancelButtonText: '取消',
          type: 'danger'
        })
      )
    },
    initDelArticle: function () {
      ajaxGet(
        `http://${this.host}/api/delArticle`, { id: this.delArticleId },
        this.succDelArticle, (e) => (console.log(e)), arguments
      )
    },
    succDelArticle: function (res) {
      const index = arguments[1]
      const data = res.data
      const code = data.code
      const msg = data.msg
      if (code === 281) {
        this.data.splice(index, 1)
        postMsg(msg, 'success')
      } else {
        postMsg(msg, 'error')
      }
    },
    modiPara: (para) => {
      return para.slice(0, 100) + '......'
    },
    source: (sour) => {
      if (sour === '原创') { return "<span class='source'>原创</span>" } else { return `<span class="other">${sour}</span>` }
    },
    pageChange: function (page) {
      this.initGetArticle(page)
    },
    initGetArticle: function (page) {
      ajaxGet(
        `http://${this.host}/api/articles`, { page: page },
        this.succGetArticle, (e) => (console.log(e)), arguments
      )
      window.scrollTo(0, 0)
    },
    succGetArticle: function (res) {
      const page = arguments[1]
      this.total = res.data.count || 0
      this.data = res.data.results || {}
      this.next = res.data.next || null
      this.prev = res.data.previous || null
      res.data.current_page = page
      this.articles.articles = res.data || null
    },
    initGetTag: function () {
      ajaxGet(
        `http://${this.host}/api/tags`, {},
        this.succGetTag, (e) => (console.log(e))
      )
    },
    succGetTag: function (res) {
      const code = res.data.code
      if (code == 277) {
        this.tags = res.data.data
        this.articles.tags = res.data.data
      } else {
        const msg = res.data.msg
        postMsg(msg, 'error')
      }
    },
    initGetUpdateOrModifyArticle: function () {
      ajaxGet(
        `http://${this.host}/api/updateArticle`, {},
        this.succGetUpdateOrModifyArticle, (e) => (console.log(e))
      )
    },
    succGetUpdateOrModifyArticle: function (res) {
      this.update_or_modify_articles = res.data.data
      this.$forceUpdate()
    },
    initGetCategory: function () {
      ajaxGet(
        `http://${this.host}/api/category`, {},
        this.succGetCategory, (e) => (console.log(e))
      )
    },
    succGetCategory: function (res) {
      const code = res.data.code
      if (code == 278) {
        this.category = res.data.data
        this.articles.category = res.data.data
      } else {
        const msg = res.data.msg
        postMsg(msg, 'error')
      }
    },
    canGetTags: function () {
      if (this.articles.tags === null) {
        this.initGetTag()
      } else {
        this.tags = this.articles.tags
      }
    },
    canGetCategory: function () {
      if (this.articles.category === null) {
        this.initGetCategory()
      } else {
        this.category = this.articles.category
      }
    },
    stickyArticle: function (el, weight) {
      const [_, id] = el.currentTarget.parentNode.parentNode.children[0].getAttribute('id').split('-')
      if (weight) {
        const request = () => {
          ajaxDel(
            STICKY_ARTICLE(id), {},
            response, genericError
          )
        }
        const response = (res) => {
          if (res.data.code === 288) postMsg('取消置顶成功', 'success')
          else postMsg('取消置顶失败', 'danger')
          this.initGetArticle(this.current_page)
        }
        request()
      } else {
        const request = () => {
          ajaxPatch(
            STICKY_ARTICLE(id), {},
            response, genericError
          )
        }
        const response = (res) => {
          if (res.data.code === 287) postMsg('置顶成功', 'success')
          else postMsg('置顶失败', 'danger')
          this.initGetArticle(this.current_page)
        }
        request()
      }
    }
  },
  mounted () {
    if (this.articles.articles === null || this.articles.isWrite) {
      this.initGetArticle(1)
      this.articles.isWrite = false
    } else {
      this.total = this.articles.articles.count || 0
      this.data = this.articles.articles.results || {}
      this.next = this.articles.articles.next || null
      this.prev = this.articles.articles.previous || null
      this.current_page = this.articles.articles.current_page
    }
    this.canGetCategory()
    this.canGetTags()
    this.initGetUpdateOrModifyArticle()
  }
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
  justify-content: space-around;
}
#program .tag > div {
  width: 40%;
  margin-left: 0;
  margin-bottom: 5px;
  display: flex;
  justify-content: end;
}
#program .tag > span {

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
#program .el-pagination {
  text-align: center;
}
#refresh-tag-cloud {
  font-size: 0.8em;
  float: right;
  color: gray;
  cursor: pointer;
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

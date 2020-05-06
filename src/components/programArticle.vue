<template>
  <div class="article" id="article-life">
    <!-- 文章详细 -->
    <article-v2
      @slide="slide"
      :article="article">
    </article-v2>

    <!-- 目录 -->
    <catalog
      :parent="articleObject">
    </catalog>

    <!-- 创作者信息，点击右侧蓝色展开按钮可打开 -->
    <authorInfo
      :authorInfo="authorInfo"
      @slide="slide">
    </authorInfo>

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
import article_v2 from './article'
import authorInfo from './author-info'
import { ajaxGet, ajaxPost, postMsg, elnotify } from '../elem_compo_encap';

export default {
  data(){
    return {
      id: this.$route.params.web,
      article: {},
      canSlideOut: true,
      // authorInfo 组件信息
      authorInfo: {},
      hasGetInfo: false,

      // 评论组件信息
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
    catalog,
    "comment-v2": comment_v2,
    "article-v2": article_v2,
    authorInfo,
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
      elnotify("","复制成功","success");
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
        this.initMakeCatalog('markdown');
      }, 5000)
    });
    setTimeout(() => {
      this.addCodeLangToPre('markdown');
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
#article-life {
  background-color: #fff;
  padding: 75px 10px 100px 0;
  line-height: 1.75;
  position: relative;
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
  right: 100px;
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
}
</style>

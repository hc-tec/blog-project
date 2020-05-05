export default {
  install(Vue, options) {
    // localhost:8000
    // 39.100.22.224
    Vue.prototype.host = 'localhost:8001';

    Vue.prototype.getUserInfo = {
      uid: 1,
      uuser_name: "annoy",
      upassword: "sun19961203",
      ugender: "男",
      uqq: 2598772546,
      uavatar: "http://39.100.22.224/static/522ce4b4-c007-48fb-83a1-2d280801f6d3.jpg",
      ufriend_card: "",
      uhobby: "不喜欢唱、跳、Rap与篮球，，，不过超级热爱写前端，(现在多一门后端)。\nPython也是我的最爱yo。",
      ugithub: "https://github.com/ASP-CC",
      uprofile: "自高考后暑假接触第一本Python电子书时，我对编程的热爱便没有了尽头。\n之后无意间接触到了Web开发，于是跟着Web部大佬学习Web技术，努力成为一名优秀的Web攻城狮。目前已习得前端三件套，Vue框架与Django框架。",
      uisSubscribe: false,
      uregis_time: "2020-03-26",
      uarticle_num: 10,
      power: {
        isLogin: false,
        addWords: false,
        editWords: false,
        delWords: false,
        editMsg: false,
        delMsg: false,
        viewVistorStatus: false,
        delArticle: false,
        addCategory: false,
        addTag: false,
        addTask: false,
        modifyCarousel: false,
      }
    },

    Vue.prototype.postMsg =  function(msg, info) {
      this.$message({
          message: msg,
          type: info,
      })
    },

    Vue.prototype.notify = function(title, msg, type) {
      this.$notify({
        title: title,
        message: msg,
        type: type
      });
    }

    Vue.prototype.ajax = function(url, params={}, resolve, reject){
      this.axios.get(url, {params:params})
        .then(response => resolve(response.data))
        .catch(e => reject(e))
    }

    Vue.prototype.post = function(url, data, resolve, reject){
      this.axios.post(url, data)
        .then(response => resolve(response.data))
        .catch(e => reject(e))
    }




    Vue.prototype.navList = [
      {
        "link": '/',
        "img": "el-icon-s-home",
        "text": "主页",
      },
      {
        "link": '/web',
        "img": "el-icon-monitor",
        "text": "技术坛",
      },
      // {
      //   "link": '/word',
      //   "img": "el-icon-s-opportunity",
      //   "text": "英语",
      // },
      {
        "link": '/todoList',
        "img": "el-icon-aim",
        "text": "任务清单",
      },
      {
        "link": '/message',
        "img": "el-icon-s-comment",
        "text": "留言",
      },
      {
        "link": '/about',
        "img": "el-icon-user",
        "text": "关于",
      },
      {
        img: "el-icon-edit",
        link: "/write",
        text: "创作你的创作"
      },
    ],

    Vue.prototype.moreProject = [
      {
        img: "el-icon-lollipop",
        link: "/feed",
        text: "赞助"
      }
    ],

    Vue.prototype.editArticleDetail = {
      isEdit: false,
      id: "",
      title: "",
      content: "",
      category: "",
      tags: [],
    }

    Vue.prototype.editArticleInit = function() {
      // 全局变量 -- 编辑文章细节恢复为空值
      Object.keys(this.editArticleDetail).forEach(key => {
        this.editArticleDetail[key] = "";
      })
      // 特殊空值处理，必须为数组，否则会出错
      this.editArticleDetail.tags = [];
    }

    // 请求之后获取的文章
    Vue.prototype.articles = {
      isWrite: false,
      articles: null,
      category: null,
      tags: null
    }

    // 更新过的文章
    Vue.prototype.update_or_modify_articles = []

    Vue.prototype.obsGetIndex = function(list, target){
      let index = 0;
      for(let el of list){
        if(target === el){
          return index;
        }
        index += 1;
      }
      return -1;
    }

    Vue.prototype.words = {
      words: null,
      wordsNum: 0,
      wordsList: [],
      timeList: null,
    }
  }
}

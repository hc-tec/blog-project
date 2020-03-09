<template>
  <div id="app">
    <pageHead :navList=navList />
    <transition :name="transitionName">
      <router-view />
    </transition>
    <transition :name="transitionName">
      <pageFoot />
    </transition>
    <transition :name="transitionName">
      <backTop />
    </transition>
  </div>
</template>

<script>

import pageHead from './components/Header'
import pageFoot from './components/footer'
import backTop from './components/backToTop'
export default {
  data(){
    return {
      //Header组件数据
      transitionName: "",
      navList: [
        {
          "link": '/',
          "img": "el-icon-s-home",
          "text": "首页",
        },
        {
          "link": '/web',
          "img": "el-icon-monitor",
          "text": "程序生活",
        },
        {
          "link": '/note',
          "img": "el-icon-notebook-2",
          "text": "课堂笔记",
        },
        {
          "link": '/word',
          "img": "el-icon-s-opportunity",
          "text": "英语学习",
        },
        {
          "link": '/todoList',
          "img": "el-icon-aim",
          "text": "今日目标",
        },
        {
          "link": '/about',
          "img": "el-icon-user",
          "text": "关于",
        },
      ],
    }
  },
  components: {
    pageHead,
    pageFoot,
    backTop,
  },
  watch: {
    $route(to, from) {
      if(to.meta.index > from.meta.index){
        this.transitionName = "slide-left";
      } else if (to.meta.index <= from.meta.index) {
        this.transitionName = "slide-right";
      }
    },
  },
}
</script>

<style scoped>
#nav a.router-link-exact-active {
  color: #42b983;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all .5s;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
</style>

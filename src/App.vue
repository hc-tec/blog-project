<template>
  <div id="app">
    <pageHead :navList=navList /> 
    <router-view>
      <router-view></router-view>
    </router-view>
    <pageFoot />
  </div>
</template>

<script>

import pageHead from './components/Header'
import pageFoot from './components/footer'
export default {
  data(){
    return {
      //Header组件数据
      navList: [
        {"首页": '/'},
        {"web前端": '/web'},
        {"算法": '/algorithm'},
        {"课堂笔记": '/note'},
        {"英语四级": '/word'},
        {"小测验": '/test'},
        {"关于": '/about'},
      ],
    }
  },
  components: {
    pageHead,
    pageFoot,
  }
}
</script>

<style scoped>
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

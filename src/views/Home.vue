<template>
  <div id="home">
    {{ greet() }}
    <div id="leftCol">
      <carousel />
    </div>
    <div id="rightCol">
      <words />
    </div>
  </div>
</template>

<script>

import carousel from '../components/carousel'
import words from '../components/wordsColumn'
export default {
  data(){
    return {

    }
  },
  methods: {
    greet: function(){
      this.$message({
        message: "欢迎来到我的博客",
        type: 'success',
      })
    }
  },
  components: {
    carousel,
    words,
  }
}
</script>

<style>
#home {
  overflow: hidden;
  display: flex;
  margin: 0 0 1% 5%;
  padding-top: 2%;
}
#leftCol {
  width: 70%;
}
#rightCol {
  width: 25%;
  margin: 0 3% 1% 1%;
  background-color: #fff;
  padding: 3% 2%;
  border: 1px ridge #ddd;
}
</style>

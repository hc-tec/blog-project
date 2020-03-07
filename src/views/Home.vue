<template>
  <div id="home">
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

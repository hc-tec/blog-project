<template>
  <div id="home">
    <login />
    <div id="home-2">
      <div id="leftCol">

        <carousel />
      </div>
      <div id="rightCol">
        <words />
      </div>
    </div>

  </div>
</template>

<script>
import login from '../components/login_horizon'
import carousel from '../components/carousel'
import words from '../components/wordsColumn'
export default {
  components: {
    carousel,
    words,
    login,
  }
}
</script>

<style>
#home {
  overflow: hidden;
  margin: 0 0 1% 5%;
  padding-top: 2%;
}
#home-2 {
  display: flex;
  justify-content: space-between;
}
#leftCol {
  width: 850px;
}
#rightCol {
  width: 350px;
  background-color: #fff;
  padding: 3% 2%;
  margin-right: 50px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
@media screen and (max-width: 800px){
  #rightCol {
    display: none;
  }
}
</style>

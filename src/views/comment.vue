<template>
  <div id="comment">

    <comment></comment>
  </div>
</template>

<script>

import comment from '../components/comment'
export default {
  components: {
    comment
  }
}
</script>

<style scoped>
#comment {
  display: flex;
  margin: 0 auto;
  padding-top: 10%;
  padding-bottom: 100px;
  width: 1000px;
  flex-direction: column;
}
@media screen and (max-width: 800px){
 #comment {
   width: 100%;
 }
}
</style>

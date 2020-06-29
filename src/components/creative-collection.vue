<template>
  <div class="created-articles-content">
    <h1>创作集</h1>
    <div class="created-articles" v-if="createdArticles.length !== 0">
      <briefDetails
        v-for="article in createdArticles"
        :key="article.title"
        :article="article" />
    </div>
    <p v-else>还没有创作任何文章喔，加油！</p>
  </div>
</template>

<script>
import briefDetails from './article-brief-details'
export default {

  components: {
    briefDetails,
  },

  props: {
    createdArticles: {
      type: Array,
      default: []
    }
  },


}
</script>

<style scoped>
.created-articles-content {
  background-color: rgb(246,246,246);
  margin-top: 30px;
  padding: 30px;
  width: 1110px;
}
.created-articles-content > * {
  margin-bottom: 30px;
}
.created-articles {
  width: 1000px;
  margin: 0 auto;
}
@media screen and (max-width: 800px){
  .created-articles {
    width: 400px;
    margin: 0;
  }
}
</style>

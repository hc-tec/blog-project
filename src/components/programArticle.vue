<template>
  <div>
    {{ dataSta }}
    <article>
      <figure>
          <img :src="article['img']"/>
      </figure>
      <div class="article">
          <p class="title">{{ article['title']}}</p>

          <component :is="getComponent">
          </component>
          <h1>
            <span><i class="el-icon-time"></i></span>
            <span> {{ article['publicDay'] }}</span><br />
            <span><i class="el-icon-place"></i></span>
            <span> {{ article['source'] }}</span>
          </h1>
      </div>

    </article>
  </div>
</template>

<script>
import "../assets/js/article"
export default {

  data(){
    return {
      class_: "",
      title: "",
      article: {},
      articleList: [],
    }
  },
  computed: {
    dataSta: function(){
      [this.class_, this.title] = this.$route.params.web.split('-')
    },
    getComponent: function(){
      this.install("programArti", () => import('../assets/mdFile/programArticle/' + this.title + '.md'))
      return "programArti"
    }
  },

  mounted(){
    this.axios
      .get("../json/program.json")
      .then(response => {
        for(var art of response.data[this.class_]){
          if(this.title === art['title'])
            this.article = art
        }
      })
      .catch(e => console.log(e))
  }
}
</script>
<style src="../assets/css/font-face.css"></style>
<style src="../assets/css/article.css" scoped></style>

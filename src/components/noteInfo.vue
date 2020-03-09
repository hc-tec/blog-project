<template>
  <div class="note-content">
    {{ getSubject }}
    <article>
      <figure>
        <img :src="img"/>
      </figure>
      <p class="title">{{ title }}</p>
      <component :is="getComponent">
      </component>
    </article>
  </div>
</template>

<script>

export default {
  data(){
    return {
      class_: '',
      title: '',
      component: '',
      img: '',
      subjectData: {
        "大学物理": {
          "质点运动": {
            "img": require("../assets/img/0TH1H1rq_eY.jpg"),
          },
        },
        "高数": {
          "微分方程": {
            "img": require("../assets/img/IvfoDk30JnI.jpg"),
          },
          "极限": {
            "img": require('../assets/img/tKl7qYVsvbU.jpg'),
          }
        },
      }
    }
  },
  computed: {
    getSubject: function(){
      [this.class_, this.title] = this.$route.params.noteInfo.split('-')
    },
    getComponent: function(){
      this.img =  this.subjectData[this.class_][this.title]["img"]
      this.install("compon", ()=>import("../assets/mdFile/" + this.title + ".md"))
      //  const context = require.context( '../assets/mdFile/programArticle/', true, /\.md$/)
      // this.install("compon", context("./pip换源.md"))

      return "compon"
    }
  },
}
</script>

<style src="../assets/css/font-face.css"></style>
<style src="../assets/css/article.css" scoped></style>
<style>
.note-content .markdown img {
  width: 50%;
}
.note-content .markdown {
  display: block;
}
.note-content .markdown > * {
  display: block;
  padding-bottom: 2%;
  margin: auto;
}
</style>

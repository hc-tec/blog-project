<template>
  <div id="essay">
    <div id="essay-content">
      <article>
        <p class="title">{{ title }}</p>
        <span style="margin-left: 5%;">来源：</span>
        <span>{{ essayInfo['source'] }}</span>&nbsp;|
        <span>发布时间：</span>
        <span>{{ essayInfo['publicDay'] }}</span>
        <div id="img-reading">
          <img :src="'.'+img">
        </div>
        <component :is="getComponent">
        </component>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      paraTitle: "",
      essayInfo: {},
      img: "",
    }
  },
  computed: {
    title: function(){
      this.paraTitle = this.$route.params.read
      return this.paraTitle
    },
    getComponent: function(){
      this.install("essayArti", ()=>import('../assets/mdFile/english/' + this.paraTitle + '.md'))
      return "essayArti"
    }
  },
  mounted(){
    this.axios
      .get('../json/artical.json')
      .then(response => {
        for(var data of response.data){
          if(this.paraTitle === data['title']){
            this.essayInfo = data['content'];
            this.img = data['img']
            break;
          }
        }
      })
  }
}
</script>

<style src="../assets/css/article.css" scoped></style>
<style scoped>
.title {
  margin-top: 5%;
}
#essay {
  width: 100%;
  padding: 0 30px;
}
#essay h1 {
  text-align: center;
  margin-bottom: 3%;
  font-family: "楷体";
}
#essay span {
  color: gray;
  margin-bottom: 4%;
}
#img-reading > img {
  width: 100%;
  height: 100%;
}
#img-reading {
  margin: 3% 3% 0 3%;
  padding: 2% 2% 0 2%;
}
#essay-para {
  white-space: pre-line;
  padding: 20px 30px;
  line-height: 25px;
  font-size: 1.2em;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-weight: bold;
}
.title + span {
  justify-self: flex-start;
}
</style>

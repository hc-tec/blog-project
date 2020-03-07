<template>
  <div id="essay">
    <div id="essay-content">
      <h1>{{ title }}</h1>
      <span>来源：</span>
      <span>{{ essayInfo['source'] }}</span>
      &nbsp;&nbsp;&nbsp;&nbsp;|
      <span>发布时间：</span>
      <span>{{ essayInfo['publicDay'] }}</span>
      <div id="img-reading">
        <img :src="'.'+img">
      </div>
      <div id="essay-para">
        <p>{{ essayInfo['para'] }}</p>
      </div>
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

<style>
#essay {
  width: 100%;
  background-color: #fff;
  padding: 40px 30px;
}
#essay h1 {
  text-align: center;
  margin-bottom: 3%;
  font-family: "楷体";
}
#essay span {
  color: gray;
}
#img-reading > img {
  width: 100%;
  height: 100%;
}
#img-reading {
  padding: 5%;
}
#essay-para {
  white-space: pre-line;
  padding: 20px 30px;
  line-height: 25px;
  font-size: 1.2em;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-weight: bold;
}
</style>

<template>
  <div>
    <article>
      <figure>
          <img :src="article['img']"/>
      </figure>
      <div>
          <p class="title">{{ article['title']}}</p>
          <p style="white-space: pre-line">{{ article['para'] }}</p>
          <h1>
            <span><i class="el-icon-time"></i></span>
            <span> {{ article['publicDay'] }}</span><br />
            <span><i class="el-icon-place"></i></span>
            <span> {{ article['source'] }}</span>
          </h1>
      </div>
      {{ dataSta }}
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
  methods: {
  },
  computed: {
    dataSta: function(){
      [this.class_, this.title] = this.$route.params.web.split('-')
    },
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
<style scoped>
div * {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

}
div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: hsl(250, 85%, 97%);
  perspective: 500px;
  padding-top: 10%;
  padding-bottom: 10%;
}
.title {
  font-style: normal;
  font-size: 2em;
}
article {
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: hsl(0, 0%, 100%);
  line-height: 2;
  border-radius: 10px;
  margin: 0.5rem;
  box-shadow: 0 0 5px -2px hsla(0, 0%, 0%, 0.1);
}
article figure {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-top: -60px;
  position: relative;
}
article figure:before {
  content: "";
  border-radius: inherit;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  border: 1rem solid hsl(250, 85%, 97%);
  box-shadow: 0 1px hsla(0, 0%, 0%, 0.1);
}
article figure img {
  border-radius: inherit;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

article div {
  margin: 2rem;
  padding: 10%;
}
article div p {
  color: hsl(250, 5%, 45%);
  font-weight: 600;
  margin: 1rem 0 3rem;
  font-family: "Noticia Text", serif;
  position: relative;
  z-index: 5;
}
article div p:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  z-index: -5;
  opacity: 0.05;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" width="70" height="70"><rect x="0" y="40" width="30" height="30"></rect><path d="M 0 40 q 0 -40 30 -40 v 15 q -15 0 -15 25"></path><rect x="40" y="40" width="30" height="30"></rect><path d="M 40 40 q 0 -40 30 -40 v 15 q -15 0 -15 25"></path></svg>'),
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" width="70" height="70" transform="rotate(180)"><rect x="0" y="40" width="30" height="30"></rect><path d="M 0 40 q 0 -40 30 -40 v 15 q -15 0 -15 25"></path><rect x="40" y="40" width="30" height="30"></rect><path d="M 40 40 q 0 -40 30 -40 v 15 q -15 0 -15 25"></path></svg>');
  background-position: 20% 20%, 80% 80%;
  background-repeat: no-repeat;
}
article div h1 {
  color: hsl(260, 5%, 55%);
  font-family: "Lato", sans-serif;
  font-size: 0.75rem;
  text-transform: uppercase;
  text-align: center;
}
</style>

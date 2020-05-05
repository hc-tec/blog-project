<template>
  <div id="engArti">
    <div id="bf-img">
      <p>双语资讯</p>
      <div class="img-art">
        <div class="img">
          <router-link
            :to="firstArt['link'] + firstArt['title']"
            :title="firstArt['title']">
            <img :src="firstArt['img']" />
          </router-link>
          <p>{{ firstArt['title'] }}</p>
        </div>
        <div class="img-art-content">
          <div class="img" v-for="art in firRightArt">
            <router-link
              :to="art['link'] + art['title']"
              :title="art['title']">
              <img :src="art['img']">
            </router-link>
            <p>{{ art["title"] }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="bf-artical">
      <p>美文鉴赏</p>
      <div v-for="bfArt in otherArt" :key="bfArt['title']">
        <div>
          <div class="img-content">
            <router-link
              :to="bfArt['link'] + bfArt['title']"
              :title="bfArt['title']">
              <img :src="bfArt['img']"/>
            </router-link>
          </div>
          <div class="artical-content">
            <router-link
            :to="bfArt['link'] + bfArt['title']" class="title"
            :title="bfArt['title']">
              {{ bfArt['title'] }}
            </router-link>
            <router-link
              :to="bfArt['link'] + bfArt['title']" class="para">
              <p>{{ modiPara(bfArt['content']['para']) }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      headArtical: [],
      firstArt: [],
      firRightArt: [],
      otherArt: [],
    }
  },
  methods: {
    modiPara: function(para){
      return para.slice(0,35) + '......'
    },
  },
  mounted(){
    this.axios
      .get('../json/artical.json')
      .then(response => {
        this.headArtical = response.data
        this.firstArt = this.headArtical[0]
        this.firRightArt = this.headArtical.slice(1,3)
        this.otherArt = this.headArtical.slice(3)
      })
      .catch(function(e){
        console.log(e);
      })
  }
}
</script>

<style scoped>
#bf-img > p:nth-child(1),
#bf-artical > p:nth-child(1) {
  font-size: 22px;
  margin: 10px 0;
  color: rgb(0,174,232);
}
.img-art {
  display: flex;
  height: 300px;
}
.img-art div {
  overflow: hidden;
}
.img-art > div:nth-child(1) {
  width: 60%;
  margin-right: 5%;
}
img {
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: all .5s;
}
img:hover {
  transform: scale(1.2);
  opacity: .8;
}
.img-art-content {
  width: 30%;
  height: 100%;
}
.img-art-content > div:nth-child(1) {
  height: 56%;
  margin-bottom: 2%;
}
.img-art-content > div:nth-child(2) {
  height: 42%;
}
.img {
  position: relative;
}
.img > p {
  bottom: 10%;
  left: 10%;
  color: white;
  position: absolute;
}
#bf-artical > div {
  margin: 2% 0 1% 0;
}
#bf-artical > div > div {
  display: flex;
}
.img-content {
  width: 170px;
  height: 120px;
  margin: 0 5% 0 0;
  border-radius: 5px;
  overflow: hidden;
}
.artical-content {
  margin-top: 1%;
}
.title {
  font-size: 1.5em;
  color: #000;
  transition: all .5s;
}
.title:hover {
  color: #42b983;
}
.para {
  color: gray;
}
.para > p {
  margin-top: 2%;
}
</style>

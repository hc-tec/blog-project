<template>
  <div id="word">
    <h2>{{ word }}</h2>
    <div>
      <span>中文翻译：</span><br />
      <p>{{ words['ch-hans'] }}</p>
    </div>
    <div>
      <span>短语搭配：</span><br />
      <template v-if="showPhrase">
        <template v-for="phra in words['phrase']">
          <p class="phraTrans">{{ phra[0] }}</p>
          <p>{{ phra[1] }}</p>
          <br />
        </template>
      </template>
      <p v-else>
        尚无收录
      </p>
    </div>
    <div>
      <span>示例：</span>
      <template v-if="showSen">
        <template v-for="sen in words['sentence']">
          <p class='sentence'>{{ sen[0] }}</p>
          <p>{{ sen[1] }}</p>
        </template>
      </template>
      <p v-else>
        尚无收录
      </p>
    </div>
    <div class="rela">
      <span>相近词汇：</span>
      <template v-if="showRela">
        <div>
          <router-link
            v-for="relaWord in words['relavant-word']"
            :to="relaWord">
            {{ relaWord }}
          </router-link>
        </div>
      </template>
      <p v-else>
        尚无收录
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      words: "",
      copyWord: "",
    }
  },
  computed: {
    word: function(){
      this.copyWord = this.$route.params.word
      return this.$route.params.word
    },
    showPhrase: function(){
      let words = this.words['phrase']
      if(words !== undefined)
        return words.length !== 0
    },
    showSen: function(){
      let sent = this.words['sentence']
      if(sent !== undefined)
      return sent.length !== 0
    },
    showRela: function(){
      let rela = this.words['relavant-word']
      if(rela !== undefined)
      return rela.length !== 0
    }
  },
  mounted(){
    this.axios
      .get('../json/words.json')
      .then(response => {
        this.words = response.data[this.copyWord]

      })
      .catch(function(e){
        console.log(e);
      })
  }
}
</script>

<style scoped>
#word {
  background-color: #fff;
  padding: 10px 15px;
  border: 1px ridge #ddd;
}
h2 {
  text-align: center;
  font-family: Georgia, serif;
  font-size: 2em;
  margin-bottom: 2%;
}
span {
  font-family: "宋体";
  font-size: 1.2em;
  color: rgb(66,185,147);
  font-weight: bold;
}
p ,a{
  margin: 2% 5%;
  font-family: "宋体";
}
.sentence {
  font-weight: bold;
  font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
}
.sentence + p {
  text-align: center;
}
.phraTrans {
  display: inline;
}
.phraTrans + p{
  display: inline;
  float: right;
  margin: 0 20% 0 0;
}
.rela > div {
  display: flex;
}
a {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  text-decoration: none;
  font-size: 1.2em;
  transition: all .5s;
}
a:hover {
  color: rgb(66,185,161);
}
</style>

<template>
  <div id="word">
    <div>
      <h2>{{ copyWord }}</h2>
      <span>中文翻译：</span><br />
      <p>{{ word['ch-hans'] }}</p>
    </div>
    <div>
      <span>短语搭配：</span><br />
      <template v-if="showPhrase">
        <div v-for="(phra) in word['phrase']" :key="phra[0]">
          <p class="phraTrans">{{ phra[0] }}</p>
          <p>{{ phra[1] }}</p>
          <br />
        </div>
      </template>
      <p v-else>
        尚无收录
      </p>
    </div>
    <div>
      <span>示例：</span>
      <template v-if="showSen">
        <div
          v-for="(sen) in word['sentence']"
          :key="sen[0]"
          class="sentence-content">
          <p class='sentence'>{{ sen[0] }}</p>
          <p>{{ sen[1] }}</p>
        </div>
      </template>
      <p v-else>
        尚无收录
      </p>
    </div>
    <div class="rele">
      <span>相近词汇：</span>
      <template v-if="showRela">
        <div>
          <router-link
            v-for="(releWord) in word['relevant-word']"
            :to="releWord"
            :key="releWord">
            {{ releWord }}
          </router-link>
        </div>
      </template>
      <p v-else>
        尚无收录
      </p>
    </div>


    <div class="prev" v-if="getPrev">
      <i class="el-icon-d-arrow-left"></i>
      <router-link :to="getPrev">{{ getPrev }}</router-link>
    </div>
    <div class="next" v-if="getNext">
      <i class="el-icon-d-arrow-right"></i>
      <router-link :to="getNext">{{ getNext }}</router-link>
    </div>


  </div>
</template>

<script>
export default {
  data(){
    return {
      word: "",
      copyWord: this.$route.params.word,
      data: {},
      getPrev: "",
      getNext: "",
      tmpDict: {},
    }
  },
  computed: {
    showPhrase: function(){
      return this.word['phrase'].length !== 0 //|| this.words.words[this.copyWord]['phrase'].length !== 0;
    },
    showSen: function(){
      return this.word['sentence'].length !== 0 //|| this.words.words[this.copyWord]['sentence'].length !== 0;
    },
    showRela: function(){
      return (this.word['relevant-word'].length !== 0) //|| (this.words.words[this.copyWord]['relevant-word'].length !== 0) || false;
    },
  },
  methods: {
    init: function(url){
      this.axios
        .get(url)
        .then(response => {
          let wordsList = Object.keys(response.data);
          let index = wordsList.indexOf(this.copyWord);
          this.words.wordsList = [...this.words.wordsList, ...wordsList];
          this.words.words = this.mergeDict(this.tmpDict, response.data);
          if(index === -1){
            this.init('http://47.115.147.39/words.php');
            return ;
          }
          this.word = response.data[this.copyWord];
          this.getPrev = wordsList[index-1] || "";
          this.getNext = wordsList[index+1] || "";
        })
    },
    getWordByGlobalVary: function(){
      if(null === this.words.words){
        this.init('../json/words.json');
      } else {
        let index = this.obsGetIndex(this.words.wordsList, this.copyWord);
        this.word = this.words.words[this.copyWord];
        if(!this.word){
          this.init('http://47.115.147.39/words.php');
        }
        this.getPrev = this.words.wordsList[index-1] || "";
        this.getNext = this.words.wordsList[index+1] || "";
      }
    }
  },
  mounted(){
    this.getWordByGlobalVary();
  },
  watch: {
    '$route' (to, from) { // 监听路由是否变化
      this.copyWord = this.$route.params.word;
      this.getWordByGlobalVary();
    }
  }
}
</script>

<style scoped>
i {
  width: auto;
  height: auto;
}
#word {
  background-color: #fff;
  padding: 10px 15px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);

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
.rele > div {
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
.prev,
.next {
  position: absolute;
  top: 50%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.next {
  right: 10%;
}
.prev {
  left: 10%;
}
.sentence-content {
  overflow-wrap: break-word;
}
</style>

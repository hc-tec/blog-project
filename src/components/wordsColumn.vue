<template>
  <div id="words">
    <div id="word-record">
      <router-link to="/recordWord">
        <i class="el-icon-star-off"></i>
        参与单词录入
        <i class="el-icon-star-off"></i>
      </router-link>
    </div>
    <p>English Words</p>
    <div class="words_num">
      <span>单词总数：</span>
      <span>{{ wordsNum }}</span>
    </div>
    <div id="words_content">
      <div>
        <p>Word</p>
        <p>Time</p>
      </div>
      <div v-for="index in displayWordNum" :key="index">
        <router-link :to="'word/'+wordsList[wordsNum-index]">
          <p :style="clear">{{ wordsList[wordsNum-index] }}</p>
        </router-link>
        <p>{{ timeList[wordsNum-index] }}</p>
      </div>
    </div>

    <p id="moreWords" @click="moreWords()">查看更多</p>
  </div>
</template>
<script>
import { mergeDict } from '../func'
export default {
  data(){
    return {
      wordsNum: 0,
      wordsList: [],
      timeList: [],
      displayWordNum: 13,
      more: true,
      clear: {
        "width": "100%",
        "text-align": "center",
        "font-family": "Georgia, serif",
      },
      tmpDict: {},
    }
  },
  methods: {
    moreWords: function(){
      let el = document.getElementById('moreWords')
      if(this.more){
        this.displayWordNum = this.wordsNum
        this.more = false
        el.textContent = "折叠"
      }
      else {
        this.displayWordNum = 13
        this.more = true
        el.textContent = "查看更多"
      }
    },
    init: function(data){
      this.wordsList = [...this.wordsList, ...Object.keys(data)]
        for(let wordInfo of Object.values(data)){
          this.timeList.push(wordInfo['learn-day'])
        }
        this.wordsNum += Object.keys(data).length
    }
  },
  mounted(){
    if(null === this.words.words || !this.words.wordsNum){
      this.axios
        .get('./json/words.json')
        .then(response => {
          this.tmpDict = mergeDict(this.tmpDict, response.data);
          this.init(response.data);
        })
        .catch(function(e){
          console.log(e);
        });
      this.axios
        .get("http://47.115.147.39/words.php")
        .then(response => {
          this.tmpDict = mergeDict(this.tmpDict, response.data);
          this.init(response.data);
        })
        .catch(e => console.log(e))
      setTimeout(() => {
        this.words.words = this.tmpDict;
        this.words.wordsNum = this.wordsNum;
        this.words.timeList = this.timeList;
        this.words.wordsList = this.wordsList;
      }, 2000)
    } else {
      this.wordsNum = this.words.wordsNum;
      this.timeList = this.words.timeList;
      this.wordsList = this.words.wordsList;
    }

  }


}
</script>

<style scoped>
#words #moreWords {
  text-align: center;
  margin: 0;
  font-size: 1em;
  color: gray;
  cursor: pointer;
  transition: all .5s;
}
#words #moreWords:hover {
  background: rgb(29, 165, 29);
  color: white;
}
#words > p {
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  color: black;
  margin-bottom: 1em;
  font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
}
#words_content > div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2%;
}
#words_content > div p {
  width: 35%;
  text-align: center;
  font-family: Georgia, serif;
}
#words_content > div:nth-child(1) p {
  color: blue;
  font-size: 1.2em;
}
a {
  width: 35%;
  text-align: center;
  text-decoration: none;
  color: rgb(29, 165, 29);
  transition: all .3s;
}
a:hover {
  color: red;
}

.words_num {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 4%;
  font-family: "宋体";
}
.words_num > span:nth-child(2) {
  color: red;
  font-family: Georgia, serif;
}
#word-record {
  width: 100%;
  text-align: center;
}
</style>

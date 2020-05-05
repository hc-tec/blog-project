<template>
  <div id="record">
    <div id="record-content">
      <h1>单词录入</h1>
      <div class="arti_cont" v-for="(eng, hans) in info" :key="eng">
        <span class="title" ref="title">{{ eng }}</span>
        <label>{{ hans }}</label>
        <el-input
            style="width:80%;"
            type="text"
            :autosize="{ minRows: 1}"
            clearable
            v-model="content[hans]"
            @focus="titMove($event)"
            @blur="titDown($event)"
            >
        </el-input>
      </div>

      <h2>短语</h2>
      <el-form :model="phrase">
        <el-form-item
          v-for="(phra) in phrase.phraseList"
          :key="phra.eng"
          :rules="{
            required: true, message: '短语不能为空'
          }"
          style="width:auto;">
          <label class="label_">英文</label>
          <el-input
            v-model="phra.eng"
            class="phrase-input"
            @focus="phraseMove($event)"
            @blur="phraseDown($event)"></el-input>
          <span class="title phrase-eng-title" ref="title">Phrase</span>

          <label class="label_">中文</label>
          <el-input
            v-model="phra.hans"
            class="phrase-input"
            @focus="phraseHansMove($event)"
            @blur="phraseHansDown($event)"></el-input>
          <span class="title phrase-hans-title" ref="title">Hans</span>

          <el-button @click.prevent="removePhrase(phra)" class="del_btn">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addPhrase()" class="add-word">增加短语</el-button>
        </el-form-item>
      </el-form>


      <h2>句子</h2>
      <el-form :model="sentence">
        <el-form-item
          v-for="(sent) in sentence.sentenceList"
          :key="sent.eng"
          :rules="{
            required: true, message: '短语不能为空'
          }"
          style="width:auto;">
          <label class="label_">英文</label>
          <el-input
            v-model="sent.eng"
            class="phrase-input"
            @focus="phraseMove($event)"
            @blur="phraseDown($event)"></el-input>
          <span class="title phrase-eng-title" ref="title">Sentence</span>

          <label class="label_">中文</label>
          <el-input
            v-model="sent.hans"
            class="phrase-input"
            @focus="phraseHansMove($event)"
            @blur="phraseHansDown($event)"></el-input>
          <span class="title phrase-hans-title" ref="title">Hans</span>

          <el-button @click.prevent="removeSentence(sent)" class="del_btn">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addSentence()" class="add-word">增加句子</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitWord()" id="word-submit">提交</el-button>

    </div>
  </div>
</template>

<script>
import {Input, Form, FormItem, Button} from 'element-ui';
export default {
  components: {
    "el-input": Input,
    "el-form": Form,
    "el-form-item": FormItem,
    "el-button": Button,
  },
  data(){
    return {
      phrase: {
        phraseList: []
      },
      sentence: {
        sentenceList: []
      },
      info: {
        "单词": "Word",
        "汉语": "Hans",
        "相近词汇": "Relevant(单词以逗号分隔)"
      },
      content: {
        "单词": "",
        "汉语": "",
        "相近词汇": ""
      }
    }
  },
  methods: {
    replaceAll: function(str){
      return str.replace(/\\n/g," ");
    },
    submitWord: function(){
      let params = `word=${this.content['单词']}&hans=${this.content['汉语']}&relevant=${this.content['相近词汇']}`;

      let count = 1;
      let copyPhraseList = JSON.parse(JSON.stringify(this.phrase.phraseList));
      for(let ele of copyPhraseList){
        ele['eng'] = this.replaceAll(ele['eng']);
        ele['hans'] = this.replaceAll(ele['hans']);
        params = params + `&phrase_${count}_eng=${ele['eng']}&phrase_${count}_hans=${ele['hans']}`;
        count++;
      }

      count = 1
      let copySentenceList = JSON.parse(JSON.stringify(this.sentence.sentenceList));
      for(let ele of copySentenceList){
        ele['eng'] = this.replaceAll(ele['eng']);
        ele['hans'] = this.replaceAll(ele['hans']);
        params = params + `&sentence_${count}_eng=${ele['eng']}&sentence_${count}_hans=${ele['hans']}`;
        count++;
      }

      this.axios.post("http://47.115.147.39/add_word.php", params)
        .then(response => {
          let code = response.data['code'];
          let msg = response.data['msg'];
          let info = 'error';
          if(210 === code){
            info = 'success';
          }
          this.postMsg(msg, info);
          this.phrase.phraseList = [];
          this.sentence.sentenceList = [];
          Object.keys(this.content).forEach(el => {
            this.content[el] = "";
          })

          let inputList = document.getElementsByTagName('input');
          for(let el of inputList){
            this.titDown(el);
          }

        }).catch(e => console.log(e))

    },
    postMsg: function(msg, info) {
        this.$message({
            message: msg,
            type: info,
        })
    },
    addSentence: function(){
      this.sentence.sentenceList.push({
        eng: "",
        hans: ""
      });
    },
    removeSentence: function(sentence){
      let index = this.sentence.sentenceList.indexOf(sentence);
      if(index !== -1){
        this.sentence.sentenceList.splice(index, 1);
      }
    },
    addPhrase: function(){
      this.phrase.phraseList.push({
        eng: "",
        hans: ""
      });
    },
    removePhrase: function(phrase){
      let index = this.phrase.phraseList.indexOf(phrase);
      if(index !== -1){
        this.phrase.phraseList.splice(index, 1);
      }
    },
    titMove: function(el) {
        let ele = el.currentTarget;
        let parent = ele.parentNode.parentNode;
        let span = parent.children[0];
        span.style.top = "0px";
        span.style.opacity = "1";
    },
    titDown: function(el) {
        let ele = el.currentTarget || el;
        let parent = ele.parentNode.parentNode;
        let span = parent.children[0];
        let label = parent.children[1].innerText;
        if("" === this.content[label]){
          span.style.top = "16px";
          span.style.opacity = ".5";
        }
    },
    postMsg: function(msg, info) {
        this.$message({
            message: msg,
            type: info,
        })
    },
    phraseMove: function(el) {
      let ele = el.currentTarget;
      let childrenList  = ele.parentNode.parentNode.children;
      let span;
      let count = 0;
      for(let tag of childrenList){
        if(tag === ele.parentNode){
          span = childrenList[count+1];
          break;
        }
        count++;
      }
      span.style.top = "0px";
      span.style.opacity = "1";

    },
    phraseHansMove: function(el) {
      let ele = el.currentTarget;
      let childrenList  = ele.parentNode.parentNode.children;
      let span;
      let count = 0;
      for(let tag of childrenList){
        if(tag === ele.parentNode){
          span = childrenList[count+1];
          break;
        }
        count++;
      }
      span.style.top = "62px";
      span.style.opacity = "1";

    },
    phraseDown: function(el) {
      let ele = el.currentTarget;
      let childrenList  = ele.parentNode.parentNode.children;
      let span;
      let count = 0;
      for(let tag of childrenList){
        if(tag === ele.parentNode){
          span = childrenList[count+1];
          break;
        }
        count++;
      }
      if("" === ele.value){
        span.style.top = "20px";
        span.style.opacity = ".5";
      }

    },
    phraseHansDown: function(el) {
      let ele = el.currentTarget;
      let childrenList  = ele.parentNode.parentNode.children;
      let span;
      let count = 0;
      for(let tag of childrenList){
        if(tag === ele.parentNode){
          span = childrenList[count+1];
          break;
        }
        count++;
      }
      if("" === ele.value){
        span.style.top = "80px";
        span.style.opacity = ".5";
      }

    }
  }
}
</script>

<style scoped>

.del_btn {
  margin-left: 15%;
}
.el-form {
  width: 90%;
  margin: 0 auto;
}
.label_ {
  float: left;
  width: 10%;
  direction: rtl;
  margin-right: 5%;
  padding: 0;
}
.phrase-input {
  width: 80%;
  float: left;
  margin-bottom: 3%;
}

#record {
  padding: 10% 20%;
}
#record-content {
  background: #fff;
  padding: 3% 5%;
  margin: 0 auto;
}
#record-content > h1 {
  text-align: center;
  margin-bottom: 5%;
}
#record-content h2 {
  text-align: center;
  margin-bottom: 5%;
}
.arti_cont {
    width: 90%;
    margin-bottom: 3%;
    position: relative;
    margin: 0 auto;
    margin-bottom: 2%;
}
.title {
    position: absolute;
    top: 16px;
    left: 20%;
    z-index: 1;
    color: rgb(64,158,255);
    line-height: 0;
    height: 10px;
    font-size: 1em;
    background-color: white;
    opacity: .5;
    transition: all .3s;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

label {
    width: 15%;
    font-size: 1.1em;
    padding-top: 7px;
    float: left;
    padding-left: 3%;
    font-family: "宋体";
}
.phrase-eng-title {
  left: 18%;
  top: 20px;
  line-height: 0;
}
.phrase-hans-title {
  left: 18%;
  top: 80px;
  height: 20px;
}
#word-submit,
.add-word {
  width: 100%;
}

</style>

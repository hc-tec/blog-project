<template>
  <div>
    <div id="pre_bg" ref="pre_bg" @click="cancelPre()"></div>
    <div ref="pre_arti" id="pre_arti">
      <p>{{ this.article.title }}</p>
      <hr />
      <markdown-interpreter
        :article="this.article.content">
      </markdown-interpreter>
   </div>
  </div>
</template>

<script>
import markdownInterpreter from './markdown-interpreter'
export default {
  props: {
    article: Object
  },
  components: {
    'markdown-interpreter': markdownInterpreter
  },
  methods: {
    pre: function () {
      const bg = this.$refs.pre_bg
      this.$refs.pre_arti.style.visibility = 'visible'
      bg.style.visibility = 'visible'
      this.$refs.pre_arti.style.transform = 'translate(-50%, 0)'
    },
    cancelPre: function () {
      const bg = this.$refs.pre_bg
      this.$refs.pre_arti.style.visibility = 'hidden'
      bg.style.visibility = 'hidden'
      this.$refs.pre_arti.style.transform = 'translate(-50%, -200%)'
    }
  }

}
</script>

<style>
#pre_bg {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 2020;
    background-color: rgb(132,143,160);
    opacity: .5;
    visibility: hidden;
    transition: all .3;
}

#pre_arti {
    position: fixed;
    z-index: 2021;
    width: 600px;
    margin:30px auto;
    background-color: white;
    color: black;
    box-shadow: 0 3px 9px rgba(0,0,0,.5);
    transform: translate(-50%, -200%);
    left: 50%;
    top: 10%;
    max-height: 70%;
    white-space: pre-wrap;
    overflow: auto;
    border-radius: 6px;
    visibility: hidden;
    transition: all .5s ease-out;
    text-indent: 0;
}

#pre_arti > p {
    font-size: 18px;
    padding: 15px;
    text-align: center;
}
#pre_arti > div {
    padding: 15px;
}
@media screen and (max-width: 800px){
  #pre_arti {
    width: 100%;
  }
}
</style>

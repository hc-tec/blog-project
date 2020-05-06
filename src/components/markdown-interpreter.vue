<template>
  <div v-html="mark(article)" class="markdown"></div>
</template>

<script>
let marked = require('marked');
let hljs = require('highlight.js');
import 'highlight.js/styles/default.css';
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code, lang) {
          if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(lang, code, true).value;
          } else {
            return hljs.highlightAuto(code).value;
          }
      }
  });
export default {
  props: {
    article: {
      type: String
    },
    showAll: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    mark(para){
      if(!this.showAll)
        return marked((para.slice(0, 140) + '......') || '')
      return marked((para || ''))
    },
  }
}
</script>

<style>
.markdown {
  margin: 10px;
  white-space: pre-wrap;
}
.markdown img {
  display: flex;
  margin: 0.5rem auto;
  max-width: 92%;
  max-height: 500px;
  border-radius: 0.2rem;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
  transition: 0.4s;
}
.markdown pre {
  margin: 1.4em 0;
  padding: .88889em;
  font-size: 1.2em;
  word-break: normal;
  word-wrap: normal;
  white-space: pre;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: #f6f6f6;
  border-radius: 4px;
}
.markdown blockquote {
  margin-left: 10px;
  border-left: 7px solid #787f8857;
  background-color: #e1e7e891;
  padding-left: 20px;
  color: gray;
  font-size: 0.9em;
}
.markdown h1,
.markdown h2,
.markdown h3,
.markdown h4,
.markdown h5,
.markdown h6 {
  position: relative;
  border-bottom: 1px dotted rgba(153,153,153,0.5);
}

.markdown h1::before,
.markdown h2::before,
.markdown h3::before,
.markdown h4::before,
.markdown h5::before,
.markdown h6::before {
  content: '';
  position: absolute;
  width: 5px;
  height: 100%;
  top: 0;
  left: -10px;
  background: #27e6f3;
}
.markdown ol,
.markdown ul {
    background: #dbde1f7a;
    padding: 20px 40px;
    border-radius: 4px;
    color: #291c1c;
}
</style>

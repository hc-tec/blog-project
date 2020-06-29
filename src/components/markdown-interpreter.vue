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


.markdown a {
  color: #409eff !important;
}
.markdown a:hover {
  border-bottom: 1px solid !important;
}
.markdown strong {
  color: red !important;
}
.markdown img {
  display: flex !important;
  margin: 0.5rem auto !important;
  max-width: 92% !important;
  max-height: 500px !important;
  border-radius: 0.2rem !important;
  transition: 0.4s !important;
  padding: 8px !important;
  margin: auto !important;
  box-shadow: 0 2px 2px rgba(10,16,20,.24), 0 0 2px rgba(10,16,20,.12) !important;
  border-radius: 4px !important;
  background-color: #fff !important;
}
.markdown pre {
  margin: 1.4em 0 !important;
  padding: .88889em !important;
  font-size: 1.2em !important;
  word-break: normal !important;
  word-wrap: normal !important;
  white-space: pre !important;
  overflow: auto !important;
  -webkit-overflow-scrolling: touch !important;
  background: #f6f6f6 !important;
  border-radius: 4px !important;
}
.markdown blockquote {
  margin-left: 10px !important;
  border-left: 7px solid #787f8857 !important;
  background-color: #e1e7e891 !important;
  padding: 20px !important;
  color: gray !important;
  font-size: 0.9em !important;
}
.markdown h1,
.markdown h2,
.markdown h3,
.markdown h4,
.markdown h5,
.markdown h6 {
  position: relative !important;
  border-bottom: 1px dotted rgba(153,153,153,0.5) !important;
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
    background: #dbde1f7a !important;
    padding: 20px 40px !important;
    border-radius: 4px !important;
    color: #291c1c !important;
}
.markdown table {
  width: 100% !important;
  border-collapse: collapse !important;
  border-spacing: 0 !important;
  overflow: auto !important;
  line-height: 1.8 !important;
}
.markdown table th {
  font-size: 1.2em !important;
  font-weight: 700 !important;
}
.markdown table th,
.markdown table td {
  border: 1px solid #ccc !important;
}
.markdown table tr:hover {
  background-color: rgb(245,245,245) !important;
}
</style>

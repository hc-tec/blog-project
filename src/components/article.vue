<template>
  <article id="article_v2">
      <!-- 标题 -->
      <p
        class="title">
        {{ article['title']}}
      </p>
      <!-- 创作者 -->
      <p
        @click="slide"
        class="author">
        <i class="el-icon-user"></i>
         创作者: {{ article['creator']['user_name'] }}
      </p>
      <!-- 创作时间 -->
      <p>
        <i class="el-icon-date"></i>
         创作时间: {{ article['create_time'] }}
      </p>
      <!-- 阅览次数 -->
      <p>
        <i class="el-icon-view"></i>
         阅读次数: {{ article['click_num'] }}
      </p>
      <!-- 类别 -->
      <p>
        <i class="el-icon-data-analysis"></i>
         类别: {{ article['category'] }}
      </p>
      <!-- 标签 -->
      <span>
        <i class="el-icon-price-tag"></i> 标签:
      </span>
      <span
        v-for="(tag) in article['tags']"
        :key="tag">
        {{ tag }} &nbsp;&nbsp;
      </span>

      <el-divider></el-divider>

      <!-- 文章内容 -->
      <markdown-interpreter
        :article="article['content']">
      </markdown-interpreter>

      <!-- 分割线 -->
      <el-divider></el-divider>
  </article>
</template>

<script>
import { Divider } from 'element-ui'
import markdownInterpreter from './markdown-interpreter'

export default {
  props: {
    article: {
      type: Object
    }
  },
  components: {
    "el-divider": Divider,
    "markdown-interpreter": markdownInterpreter
  },
  methods: {
    slide: function(){
      this.$emit("slide")
    }
  }
}
</script>

<style>
#article_v2 {
  width: 900px;
}
#article_v2 {
  padding-left: 250px;
}
#article_v2 .title {
  font-size: 2em;
  text-align: center;
}
@media screen and (max-width: 800px){
  #article_v2  {
    width: 95%;
  }
  #article_v2  {
    padding: 0 30px;
  }
}
</style>

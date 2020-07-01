<template>
  <div class="recomment-articles">
    <p><i class="fa fa-stack-overflow"></i> 阅读推荐</p>
    <div>
      <neu-anchor
        v-for="article in articles"
        :key="article.title"
        :link="'/web/'+article.id">
        {{ article.title }}
      </neu-anchor>
    </div>
  </div>
</template>

<script>
import { ajaxGet } from '../../elem_compo_encap'
import { RECOMMEND_ARTICLE } from '../../api'
import { genericError } from '../../func'
export default {
  data() {
    return {
      articles: [],
    }
  },
  methods: {
    getRecommendArticle() {
      const request = () => {
        ajaxGet(
          RECOMMEND_ARTICLE, {},
          response, genericError
        )
      }
      const response = (res) => {
        this.articles  = res.data
      }
      request()
    }
  },
  mounted() {
    this.getRecommendArticle()
  }
}
</script>

<style>
.recomment-articles .neumorphic-anchor {
  font-size: .8em;
  word-break: break-all;
  width: 100%;
}
.recomment-articles > * {
  margin-bottom: 20px;
}
</style>

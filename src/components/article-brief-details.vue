<template>
  <section>
    <neu-anchor
      class="article-title"
      :link="'/web/'+article.id">
      {{ article.title }}
    </neu-anchor>
    <neu-tag prefixIcon="fa fa-tag">
      {{ article.tag[0] }}
    </neu-tag>
    <neu-tag class="create-time" prefixIcon="fa fa-calendar">
      {{ article.create_time }}
    </neu-tag>
  </section>
</template>

<script>

export default {
  props: {
    article: {
      type: Object,
    }
  }
}
</script>

<style scoped>
section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
section > * {
  margin-right: 30px;
}
.neumorphic-tag {
  width: 100px;
}
* {
  font-size: 1.2em;
  margin-bottom: 5px;
}
.article-title {
  width: 60%;
  word-break: break-all;
}
.create-time {
  width: 150px !important;
}
::v-deep .create-time i {
  color: var(--success-color);
}
@media screen and (max-width: 800px){
  .article-title {
    width: 400px;
  }
  .create-time {
    display: none !important;
  }
}
</style>

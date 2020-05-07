<template>
  <!-- 文章归档 -->
  <div id="file">
    <File
      :file="file">
    </File>
  </div>
</template>

<script>
import File from '../components/file'
import { ajaxGet } from '../elem_compo_encap'
export default {
  components: {
    File,
  },
  data(){
    return {
      file: null
    }
  },
  methods: {
    initGetArticleFile(){
      ajaxGet(
        `http://${this.host}/api/articleFile`, {},
        this.succGetArticleFile, (e)=>(console.log(e))
      )
    },
    succGetArticleFile(res){
      this.file = res.data;
      this.global.fileArticle = this.file;
    }
  },
  mounted(){
    if(!this.global.fileArticle){
      this.initGetArticleFile();
    } else {
      this.file = this.global.fileArticle;
    }

  }
}
</script>

<style>

</style>

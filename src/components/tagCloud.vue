<template>
  <div id="tag-cloud-content">
    <canvas width="270" height="270" id="tag-cloud"></canvas>
    <div id="cloud">
      <ul>
        <li v-for="(tag,index) in tags" :key="tag.name">
          <a
            href="javascript:"
            :style="'font-size:'+(10+tag.num)+'px'"
            @click="initGetArticleByTag(index)">
            {{ tag.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    tags: Array
  },
  methods: {
    initGetArticleByTag(index){
      document.body.scrollIntoView();
      this.$emit("initGetArticleByTag", index);
    },
    startCloud(){
      try {
        TagCanvas.Start('tag-cloud', 'cloud', {
          textColour: '#66ccff',
          outlineColour: '#66ccff',
          reverse: true,
          maxSpeed: 0.1,
          weight: true,
          weightMode: 'both',
        });
      } catch(e) {
        document.getElementById('tag-cloud').style.display = 'none';
      }
    }
  },
  mounted(){
    this.startCloud()
  }
}
</script>

<style>

</style>

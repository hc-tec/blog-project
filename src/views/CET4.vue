<template>
  <div id="cet-4">
    <div id="cetWord">
      <word />
    </div>
    <div id="cetArtical">
      <artical />
    </div>
  </div>
</template>

<script>
import word from '../components/wordsColumn'
import artical from '../components/artical'
export default {
  components: {
    word,
    artical,
  }
}
</script>

<style scoped>
#cet-4 {
  display: flex;
  margin: 0 5% 5% 10%;
}
#cetWord {
  width: 25%;
  background-color: #fff;
  border: 1px ridge #ddd;
  margin: 5% 4% 0 0;
  padding: 20px 15px;
}
#cetArtical {
  margin: 3% 0 0 0;
  background: #fff;
  border: 1px ridge #ddd;
  width: 70%;
  padding: 20px;
}

</style>

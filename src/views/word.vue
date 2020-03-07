<template>
  <div id="wordPage">
    <div id="word-content">
      <word />
    </div>
  </div>
</template>

<script>
import word from '../components/word'
export default {
  components: {
    word,
  }
}
</script>

<style>
#word-content {
  width: 600px;
  margin: 10% auto;
  margin-top: 0;
  padding-top: 10%;
}
</style>

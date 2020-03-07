<template>
  <div id="essays">
    <essay />
  </div>
</template>

<script>
import essay from '../components/essay'
export default {
  components: {
    essay,
  },
}
</script>

<style scoped>
#essays {
  display: flex;
  margin: 0 3% 5% 10%;
  width: 60%;
  min-width: 700px;
  padding: 40px 25px;
  padding-top: 5%;
}

</style>

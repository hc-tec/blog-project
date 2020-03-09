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
  margin: auto;
  min-width: 700px;
  padding: 0 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: hsl(250, 85%, 97%);
}

</style>

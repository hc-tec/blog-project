<template>
  <div id="programLife">
    <program />
  </div>
</template>

<script>
import program from '../components/program'
export default {
  components: {
    program
  }
}
</script>

<style>
#programLife {
  margin: 0 50px 15% 50px;
  padding-top: 8%;
}
@media screen and (max-width: 800px){
  #programLife {
    margin: 0;
    padding-top: 50px;
    /* padding: 50px 20px; */
  }
}
</style>

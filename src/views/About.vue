<template>
  <div id="pageAbout">
    <about />
    <!-- <timeLine /> -->
  </div>
</template>

<script>
import about from '../components/about'
// import timeLine from '../components/timeLine'
export default {
  components: {
    about
    // timeLine,
  }
}
</script>

<style>
#pageAbout {
  /* display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center; */
  padding-top: 10%;
  padding-bottom: 20%;
  background-color: #fff;
  /* background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%); */

}
</style>

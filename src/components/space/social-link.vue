<template>
  <div class="social-link">
    <neu-anchor
      v-for="link in socialLink"
      :key="link.icon"
      :icon="link.icon"
      :link="link.link"
      :style="{
        'color': link.color
      }"
      :router="false"
      circle>
    </neu-anchor>
  </div>
</template>

<script>
export default {
  props: {
    socialLink: Array
  }
}
</script>

<style>
.social-link .fa {
  font-size: 2em;
}
</style>

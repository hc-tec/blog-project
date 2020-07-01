<template>
  <div class="writer-module">
    <p><i class="fa fa-pencil	"></i> 今日份创作</p>
    <neu-button color="success" @click="create">Go For Create!</neu-button>
  </div>
</template>

<script>
export default {
  methods: {
    create() {
      this.$router.push('/write')
    }
  }
}
</script>

<style>
.writer-module  {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

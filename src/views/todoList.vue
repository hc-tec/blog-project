<template>
  <div id="todoList">
    <todoList />
  </div>
</template>

<script>
import todoList from '../components/todoList'

export default {
  components: {
    todoList
  }
}
</script>

<style>
/*不能加 scoped!!! */
  #todoList {
    padding-top: 5%;
  }
</style>

<template>
  <el-backtop
    style="{
      background-color: #0ff;
      box-shadow: 0 0 6px rgba(255, 255, 255, 0.74);
      background-image: linear-gradient(355deg, #8EC5FC, #E0C3FC);
      color: #000;
      width: 80px;
      height: 40px;
      border-radius: 5px;
      font-size: 1.5em;
    }">
  </el-backtop>
</template>

<script>
import { Backtop, Icon } from 'element-ui';

export default {
  components: {
    "el-backtop": Backtop,
    "el-icon": Icon,
  }
}
</script>

<style>
.el-icon-caret-top {
  height: auto;
}
.el-backtop:hover {
  opacity: .8;
}
@media screen and (max-width: 800px){
  .el-backtop {
    visibility: hidden;
  }
}

</style>

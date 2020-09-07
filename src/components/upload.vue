<template>
  <el-upload
    ref="upload"
    action="fakeUrl"
    :on-change="handleChange"
    :before-upload="beforeUpload">
    <neu-button size="mini">
      <slot></slot>
    </neu-button>
  </el-upload>
</template>

<script>
import { Upload } from 'element-ui'

export default {
  components: {
    'el-upload': Upload
  },
  data() {
    return {
    }
  },
  methods: {
    handleChange(file) {
      this.$emit('on-change', file)
    },
    beforeUpload(file) {
      this.$emit('before-upload', file)
    }
  }
}
</script>

<style>

</style>

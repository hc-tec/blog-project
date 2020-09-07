<template>
  <div class="yundisk-file">
    <i class="fa fa-file-o"></i>
    <span :title="file.name">{{ format(file.name) }}</span>
    <div class="yundisk-operate-btn">
      <neu-button
        size="mini"
        color="primary"
        @click="download(file.url)">
        <i class="el-icon-download"></i>
      </neu-button>
      <neu-button
        size="mini"
        color="danger"
        @click="del(file.url, index)">
        <i class="el-icon-delete"></i>
      </neu-button>
    </div>
  </div>
</template>

<script>
import { ajaxGet, ajaxDel, NeuMessageBox, postMsg } from '../../../../elem_compo_encap'
import { FILE_LOADER } from '../../../../api';
import { genericError } from '../../../../func';
// import downloadUrlFile from '../../../../download';
export default {
  props: {
    file: Object,
    index: Number
  },
  methods: {
    download(url) {
      const a = document.createElement('a')
      a.setAttribute('href', url)
      a.setAttribute('download', 'xxx')
      a.setAttribute('target', '_blank')
      a.click()
    },
    del(url, index) {
      const request = () => {
        ajaxDel(
          FILE_LOADER, {url},
          response, genericError
        )
      }
      const response = (res) => {
        if(res.data.code === 285) {
          postMsg('文件已删除', 'success');
          this.$emit('file-delete', index)
        }
      }
      const config = {
        title: '删除框框',
        message: '确定删除此文件？',
        resolve: request,
      }
      NeuMessageBox.confirm(config);
    },
    format(name) {
      return name.length > 7 ? name.slice(0,7)+'...' : name;
    }
  },
}
</script>

<style scoped>
.yundisk-file {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 120px;
  width: 150px;
  padding: 10px;
}
.yundisk-file span {
  font-size: 1em;
  max-width: 150px;
  text-align: center;
}
.yundisk-file .fa {
  text-align: center;
  font-size: 4em;
}
.yundisk-operate-btn {
  display: flex;
  justify-content: space-evenly;
}
</style>

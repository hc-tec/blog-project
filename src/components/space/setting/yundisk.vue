<template>
  <div class="yun-disk">
    <fileUploader
      class="diskfile-uploader"
      ref="uploader"
      @on-change="beforeUpload">
      {{ loadText }}
    </fileUploader>
    <div class="yun-disk-files">
      <file
        v-for="(file,index) in diskFiles"
        :key="file.url"
        :file="file"
        :index="index"
        @file-delete="fileDelete"
      />
    </div>

  </div>
</template>

<script>
import fileUploader from '../../upload'
import file from './yundisk/file'
import { ajaxGet, ajaxPatch, postMsg } from '../../../elem_compo_encap'
import { YUN_DISK_FILE, FILE_LOADER } from '../../../api'
import { genericError } from '../../../func'
export default {
  components: {
    fileUploader,
    file
  },
  data() {
    return {
      loadText: '+ 上传',
      requestCount: 0,
      processBar: 0,
      diskFiles: null,
    }
  },
  methods: {
    beforeUpload(file) {
      const isLmt = (file.size / 1024 / 1024) <= 30
      if(isLmt) {
        this.fileChange(file)
      } else {
        postMsg('文件大小不能超过 30MB 喔')
        return false;
      }
    },
    fileChange(file) {
      if(this.requestCount % 2 === 0){
        let { name, _, raw, size, __, uid } = file
        const type = name.split('.')[name.split('.').length-1];
        const loadText = this.loadText
        this.loadText = '等待中'
        let start = 0
          , end = 0
          , index = 0
          , count = 0
          , bytesPiece = 1024 * 1024 // 每个1MB
          , totalPieces = Math.ceil(size / bytesPiece)
        while(start < size) {
          end = start + bytesPiece
          if(end > size) {
            end = size
          }
          const chunk = raw.slice(start, end);
          const formdata = new FormData()
          formdata.append('file', chunk, `${uid}.${type}`)
          formdata.append('index', index)
          const sliceRequest = () => {
            const config = {
              headers: { 'Content-Type': 'multypart/form-data' }
            }
            this.axios.post(FILE_LOADER, formdata, config)
              .then(res => sliceResponse(res))
              .catch(e => genericError(e))
          }
          const sliceResponse = (res) => {
            if(res.data.code === 282) {
              count ++;
              this.processBar = count / totalPieces
              this.loadText = `${this.processBar.toFixed(1)*100}% ${loadText}`
              if(count == totalPieces) {
                this.loadText = '合并文件中'
                mergeRequest()
              }
            }
          }
          const mergeRequest = () => {
            ajaxPatch(
              FILE_LOADER, {file: uid, name, type, id: this.getUserInfo.uid},
              mergeResponse, genericError
            )
          }
          const mergeResponse = (res) => {
            if(res.data.code === 200) {
              postMsg('文件上传成功', 'success');
              this.diskFiles.push({name,url:res.data.path});
              this.loadText = '合并完成，上传成功';
              setTimeout(() => {
                this.loadText = loadText
              }, 1000);
            }
            else postMsg('文件上传失败')
          }
          sliceRequest()
          start = end
          index ++;
        }
      }
      this.requestCount ++;

    },
    getDiskFiles() {
      const request = () => {
        ajaxGet(
          YUN_DISK_FILE(this.getUserInfo.uid), {},
          response, genericError
        )
      }
      const response = (res) => {
        this.diskFiles = res.data;
      }
      request()
    },
    fileDelete(index) {
      this.diskFiles.splice(index, 1)
    }
  },
  created() {
    this.getDiskFiles()
  }

}
</script>

<style>
.yun-disk-files {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  position: relative;
}
.yun-disk-files > * {
  margin-right: 20px;
}
.diskfile-uploader {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}
</style>

<template>
  <div class="bgImage-setting">
    <h2>为您的空间设置张背景图片吧</h2>
    <h3>上传图片</h3>
    <el-upload
      class="upload-bgImage"
      drag
      :action="UPLOAD"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      multiple>
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="avatar"
        style="max-width: 100%;height: 100%;">
      <i class="el-icon-upload" v-else></i>
      <div class="el-upload__tip" slot="tip">
        支持拖拽上传，只能上传大小不超过5MB的图片<br />
        <neu-button
          v-if="imageUrl"
          @click="setBgImage(imageUrl)">
          就这个了
        </neu-button>
      </div>
    </el-upload>
    <h3>从已有图片库中寻找图片</h3>
    <imageCollection @setBgImage="setBgImage($event)" />
  </div>
</template>

<script>
import imageCollection from '../image-collection'
import { Upload } from 'element-ui'
import { USER_SPACE_BGIMAGE, UPLOAD } from '../../../api'
import { postMsg, ajaxGet } from '../../../elem_compo_encap'
import { genericError } from '../../../func'
export default {
  components: {
    "el-upload": Upload,
    imageCollection
  },
  data() {
    return {
      UPLOAD: UPLOAD,
      imageUrl: '',
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const fileSize = (size) => {
        const isLt2M = (size / 1024 / 1024)
        return isLt2M <= 5
      }
      const size = fileSize(file.size);
      if(!size) postMsg('文件大小过大', 'error');
      return size
    },
    handleAvatarSuccess(res) {
      if(res.code === 282) this.imageUrl = res.msg
      else postMsg('上传失败', 'danger')
    },
    setBgImage(imgUrl) {
      const request = () => {
        ajaxGet(
          USER_SPACE_BGIMAGE(this.getUserInfo.uid), {'image': imgUrl},
          response, genericError
        )
      }
      const response = (res) => {
        if(res.data.code === 242) {
          postMsg('背景图片设置成功', 'success');
          const root = document.getElementById('user-space');
          this.getUserInfo.ubgImage = imgUrl;
          root.style.backgroundImage = `url(${imgUrl})`;
        }
        else postMsg('背景图片设置失败', 'error')
      }
      request();
    }
  }
}
</script>

<style>
.bgImage-setting h3 {
  position: relative;
}
.bgImage-setting h3::before {
  content: '';
  position: absolute;
  width: 5px;
  height: 100%;
  top: 0;
  left: -10px;
  background: #27e6f3;
}
.upload-bgImage {
  text-align: center;
}
</style>

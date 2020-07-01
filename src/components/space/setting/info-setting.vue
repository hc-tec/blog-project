<template>
  <div class="info-setting">
    <h2>个人信息修改</h2>
    <div>
      <neu-label>头像</neu-label>
      <el-upload
        drag
        :action="UPLOAD"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        multiple>
        <img
          v-if="userInfo.avatar"
          :src="userInfo.avatar"
          style="width: 100%;height: 100%;">
        <i class="el-icon-upload" v-else></i>
        <div class="el-upload__tip" slot="tip">
          支持拖拽上传，只能上传大小不超过5MB的图片<br />
        </div>
      </el-upload>
    </div>
    <neu-input label="用户名" v-model="userInfo.user_name"></neu-input>
    <div>
      <neu-label>性别</neu-label>
      <neu-radio label="男" v-model="userInfo.gender">男</neu-radio>
      <neu-radio label="女" v-model="userInfo.gender">女</neu-radio>
    </div>
    <neu-input label="QQ" v-model="userInfo.qq" type="number"></neu-input>
    <neu-input label="github" v-model="userInfo.github"></neu-input>
    <neu-input label="兴趣" v-model="userInfo.hobby"></neu-input>
    <neu-input label="个人简介" type="textarea" v-model="userInfo.profile"></neu-input>
    <neu-button
      @click="submitModify"
      class="user-space-info-modify-btn"
      color="primary">修改</neu-button>
  </div>
</template>

<script>
import { Upload } from 'element-ui'
import { UPLOAD, USER_INFO_MODIFY } from '../../../api'
import { postMsg, ajaxGet, ajaxPatch } from '../../../elem_compo_encap'
import { genericError } from '../../../func'
export default {
  components: {
    "el-upload": Upload,
  },

  data() {
    return {
      UPLOAD: UPLOAD,
      userInfo: {
        avatar: this.getUserInfo.uavatar,
        user_name: this.getUserInfo.uuser_name,
        gender: this.getUserInfo.ugender,
        qq: this.getUserInfo.uqq === 'null' ? '' : this.getUserInfo.uqq,
        github: this.getUserInfo.ugithub === 'null' ? '' : this.getUserInfo.ugithub,
        hobby:  this.getUserInfo.uhobby === 'null' ? '' : this.getUserInfo.uhobby,
        profile:  this.getUserInfo.uprofile === 'null' ? '' : this.getUserInfo.uprofile,
      }
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
      if(res.code === 282) this.userInfo.avatar = res.msg
      else postMsg('上传失败', 'danger')
    },
    submitModify() {
      const request = () => {
        ajaxPatch(
          USER_INFO_MODIFY(this.getUserInfo.uid), this.userInfo,
          response, genericError
        )
      }
      const response = (res) => {
        if(res.data.code === 289) postMsg('信息修改成功', 'success');
        else postMsg('信息修改失败', 'error');
      }
      request()
    },
  }

}
</script>

<style>
.info-setting {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.info-setting > div {
  display: flex;
  align-items: center;
  width: 100%;
}
.info-setting .neumorphic-label {
  width: 50px;
  display: inline-block;
}
.info-setting .neumorphic-input {
  width: 400px;
}
.user-space-info-modify-btn {
  width: 20%;
  margin-left: 40%;
}
</style>

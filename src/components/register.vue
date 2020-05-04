<template>
  <div id="regis">
    <el-card>
    <div id="regis-content">

      <div class="el-upload__text">将<em>头像</em>拖至下方框内</div>

        <el-upload
          action="http://39.100.22.224/api/fileLoader"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          multiple
          drag>
          <img v-if="imageUrl" :src="imageUrl" class="avatar" width="100%">
        </el-upload>

        <el-form
          :model="regisData"
          :rules="rules"
          label-position="left"
          style="width: 70%;"
          ref="regisData">

          <el-form-item label="用户名" prop="user_name">
            <el-input
              v-model="regisData.user_name"
              maxlength="20"
              show-word-limit></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password" >
            <el-input
              maxlength="16"
              v-model="regisData.password"
              show-password
              show-word-limit
              ></el-input>
          </el-form-item>

          <el-form-item label="QQ号" prop="qq">
            <el-input
              v-model="regisData.qq"
              maxlength="10"
              show-word-limit></el-input>
          </el-form-item>


          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="regisData.gender">
              <el-radio label="male"></el-radio>
              <el-radio label="female"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Github网址" prop="github">
            <el-input
              v-model="regisData.github"
              maxlength="128"
              show-word-limit>
              </el-input>
          </el-form-item>

          <el-form-item label="兴趣" prop="hobby">
            <el-input
              type="textarea"
              v-model="regisData.hobby"
              maxlength="256"
              show-word-limit
              ></el-input>
          </el-form-item>

          <el-form-item label="个人简介" prop="profile">
            <el-input
              type="textarea"
              v-model="regisData.profile"
              maxlength="1024"
              show-word-limit
              ></el-input>
          </el-form-item>

          <el-form-item label="激活码(选填)" v-if="false">
            <el-input v-model="regisData.friend_card"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              class="waves-effect"
              type="primary"
              @click="register('regisData')"
              style="width: 100%;">立即创建!</el-button>
          </el-form-item>

        </el-form>

    </div>
  </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      regisData: {
        user_name: '',
        password: '',
        qq: '',
        friend_card: '',
        gender: '',
        github: '',
        avatar: '',
        hobby: '',
        profile: '',
      },
      rules: {
        user_name: [
          {
            required: true, message: '起个名字吧', trigger: 'blur'
          }
        ],
        password: [
          {
            required: true, message: '黑客最喜欢账号没有密码的小朋友了', trigger: 'blur'
          },
          {
            min: 6, max: 16, message: '密码长度在 6 ~ 16 个字符之间喔'
          }
        ],
        qq: [
          {
            required: true, message: '顺便留个QQ吧', trigger: 'blur'
          },
          {
            max: 10, message: ''
          }
        ],
        gender: [
          {
            required: true
          }
        ]
      }
    }
  },
  methods: {
    register: function(ref){
      let data = this.$refs[ref].model
      let param = new FormData();
      Object.keys(data).forEach(key => {
        param.append(key, data[key]);
      });
      let config = {
        headers: {'Content-Type': 'multypart/form-data'}
      };
      this.asynPost(`http://${this.host}/api/register`, param, config);
    },
    asynPost: function(url, data, config){
      this.axios.post(url,  data, config)
        .then(response => {
          let code = response.data['code'];
          let msg = response.data['msg'];
          if(271 === code){
            this.postMsg(msg, 'success');
            setTimeout(() => {
              this.$router.push('/login');
            }, 1000)
          } else {
            this.postMsg(msg, 'error');
          }
        }).catch(e => (console.log(e)))
    },
    beforeAvatarUpload: function(file){
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 3MB!');
      }
      return isLt2M;
    },
    handleAvatarSuccess: function(res){
      this.imageUrl = res['msg'];
      this.regisData.avatar = res['msg'] || "http://p0.qhimg.com/bdm/384_237_0/t01b30dd1843479c87c.jpg";
    }
  }
}
</script>

<style scoped>
#regis {
  width: 700px;
  margin:  0 auto;
  padding: 5% 0;
}
#regis-content {
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  padding: 20px 20px;
}
@media screen and (max-width: 800px){
  #regis {
    width: 100%;
  }
}
</style>

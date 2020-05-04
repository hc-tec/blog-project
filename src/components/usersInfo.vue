<template>
  <div id='usersInfo'>
    <el-table
      :data="usersInfo">


    <el-table-column
      label="ID"
      width="80"
      >
      <template slot-scope="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="头像"
      width="100"
      >
      <template slot-scope="scope">
        <img style="margin-left: 10px" :src="scope.row.avatar" width="100%" height="100%">
      </template>
    </el-table-column>

    <el-table-column
      label="用户名"
      width="150"
      >
      <template slot-scope="scope">
        <i class="el-icon-user"></i>
        <span style="margin-left: 10px">{{ scope.row.user_name }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="性别"
      width="80"
      >
      <template slot-scope="scope">
        <i :class="scope.row.gender === '男' ? 'el-icon-male' : 'el-icon-female'"></i>
        <span style="margin-left: 10px">{{ scope.row.gender }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="QQ"
      width="150"
      >
      <template slot-scope="scope">
        <i class="el-icon-share"></i>
        <span style="margin-left: 10px">{{ scope.row.qq }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="注册时间"
      width="200"
      >
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.regis_time }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="最近登录时间"
      width="200"
      >
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.login_time }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="Github"
      >
      <template slot-scope="scope">
        <i class="el-icon-edit-outline"></i>
        <span style="margin-left: 10px">{{ scope.row.github }}</span>
      </template>
    </el-table-column>

    </el-table>

  </div>
</template>

<script>
export default {
  data(){
    return {
      usersInfo: [],
    }
  },
  methods: {
    getUsersInfo: function(){
      this.axios
        .post(`http://${this.host}/api/usersInfo`)
        .then(response => {
          let code = response.data['code'];
          let msg = response.data['msg'];
          if(286 === code){
            this.usersInfo = response.data['data'];
          }
          this.postMsg(msg)
        })
    }
  },
  mounted(){
    this.getUsersInfo();
  }
}
</script>

<style scoped>
#usersInfo {
  width: 1100px;
  margin: 0 auto;
}
</style>

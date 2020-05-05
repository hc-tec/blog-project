<template>
  <div id='usersInfo'>
    <!-- Admin 页面用户信息组件 -->
    <el-table
      :data="usersInfo">

      <!-- ID -->
      <el-table-column
        label="ID"
        width="80"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <!-- 头像 -->
      <el-table-column
        label="头像"
        width="100"
        >
        <template slot-scope="scope">
          <img style="margin-left: 10px" :src="scope.row.avatar" width="100%" height="100%">
        </template>
      </el-table-column>

      <!-- 用户名 -->
      <el-table-column
        label="用户名"
        width="150"
        >
        <template slot-scope="scope">
          <i class="el-icon-user"></i>
          <span style="margin-left: 10px">{{ scope.row.user_name }}</span>
        </template>
      </el-table-column>

      <!-- 性别 -->
      <el-table-column
        label="性别"
        width="80"
        >
        <template slot-scope="scope">
          <i :class="scope.row.gender === '男' ? 'el-icon-male' : 'el-icon-female'"></i>
          <span style="margin-left: 10px">{{ scope.row.gender }}</span>
        </template>
      </el-table-column>

      <!-- QQ -->
      <el-table-column
        label="QQ"
        width="150"
        >
        <template slot-scope="scope">
          <i class="el-icon-share"></i>
          <span style="margin-left: 10px">{{ scope.row.qq }}</span>
        </template>
      </el-table-column>

      <!-- 注册时间 -->
      <el-table-column
        label="注册时间"
        width="200"
        >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.regis_time }}</span>
        </template>
      </el-table-column>

      <!-- 最近登录时间 -->
      <el-table-column
        label="最近登录时间"
        width="200"
        >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.login_time }}</span>
        </template>
      </el-table-column>

      <!-- Github -->
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
import { Table, TableColumn } from 'element-ui';
import { ajaxPost, postMsg } from '../elem_compo_encap'
export default {
  components: {
    "el-table": Table,
    "el-table-column": TableColumn,
  },
  data(){
    return {
      usersInfo: [],
    }
  },
  methods: {
    getUsersInfo: function(){
      ajaxPost(
        `http://${this.host}/api/usersInfo`,{},
        this.succGetUserInfo, this.failGetUserInfo
      )
    },
    succGetUserInfo: function(res){
      let code = res.data['code'];
      let msg = res.data['msg'];
      if(286 === code){
        this.usersInfo = res.data['data'];
      }
      postMsg(msg)
    },
    failGetUserInfo: function(e){
      console.log(e);
      postMsg('信息获取失败', 'danger');
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

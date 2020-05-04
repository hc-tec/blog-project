<template>
  <div id="admin">
    <el-tabs
      tab-position="top"
      v-if="this.getUserInfo.power.viewVistorStatus">
      <el-tab-pane label="访客信息"><ip /></el-tab-pane>
      <el-tab-pane label="图片管理"><img_admin /></el-tab-pane>
      <el-tab-pane label="用户管理"><users /></el-tab-pane>
    </el-tabs>
    <p class="no-admin" v-else>机密！只有管理员可以查看喔</p>
  </div>
</template>

<script>
import ip from '../components/ip'
import img_admin from '../components/img'
import users from '../components/usersInfo'
export default {
  components: {
    ip,
    img_admin,
    users,
  }
}
</script>

<style>
.no-admin {
  padding: 300px 0;
  text-align: center;
  font-size: 1.6em;
  color: white;
}
#admin {
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
}
#admin > div:nth-child(1) {
  padding-top: 10%;
  padding-bottom: 5%;
}
.el-tabs__header {
  margin-left: 10%;
}
.el-tabs__item {
  color: white;
}
</style>

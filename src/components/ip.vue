<template>
  <div id="vistor-IP">
    <!-- Admin中访客IP等信息组件 -->
    <h2>访客信息</h2>
    <el-table
      :data="vistorData"
      style="width: 800px;margin: 0 auto;"
      height="400">

      <!-- IP -->
      <el-table-column
        prop="ip"
        label="IP"
        fixed>
        <template slot-scope="scope">
          <i class="el-icon-map-location"></i>
          <span style="margin-left: 10px">{{ scope.row.ip }}</span>
        </template>
      </el-table-column>

      <!-- 访问次数 -->
      <el-table-column
        prop="count"
        label="访问次数"
        fixed>
        <template slot-scope="scope">
          <i class="el-icon-connection"></i>
          <span style="margin-left: 10px">{{ scope.row.count }}</span>
        </template>
      </el-table-column>

      <!-- 访问时间 -->
      <el-table-column
        prop="vis_time"
        label="访问时间"
        fixed>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.vis_time }}</span>
        </template>
      </el-table-column>

      <!-- 还未开发 -->
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, vistorData)"
            type="danger"
            size="small"
            disabled>
            移除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
import { Table, TableColumn, Button } from 'element-ui';
import { ajaxPost, postMsg } from '../elem_compo_encap'
export default {
  components: {
    "el-table": Table,
    "el-table-column": TableColumn,
    "el-button": Button,
  },
  data(){
    return {
      vistorData: null,
      totalVisCount: 0,
    }
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    initGetUserIp: function(){
      ajaxPost(
        "http://47.115.147.39/visIP.php", {user_type:"SUPER_USER"},
        this.succGetUserIp, (e)=>(console.log(e))
      )
    },
    succGetUserIp: function(res){
      let code = res.data['code'];
      let msg = res.data['msg'];
      msg = `管理员，${msg}`;
      let info = "error";
      if(280 == code){
        info = "success";
        this.totalVisCount = res.data['sum'];
        this.vistorData = res.data['data'];
      }
      postMsg(msg, info);
    }
  },
  mounted(){
    this.initGetUserIp();
  }
}
</script>

<style>

#vistor-IP h2 {
  text-align: center;
  margin-bottom: 3%;
  color: greenyellow;
}
</style>

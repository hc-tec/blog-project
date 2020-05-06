<template>
  <div id="task-displayer">
    <p>Target</p>
    <ul class="rolldown-list" id="List">
      <el-table
        :data="todoListData"
        class="rolldown-list"
        height="300"
        >
        <!-- 序号 -->
        <el-table-column
          type="index"
          label="序号"
          width="80"
          >
        </el-table-column>

        <!-- 待办事项 -->
        <el-table-column
          label="待办事项"
          width="300"
          >
          <template slot-scope="scope">
            <i class="el-icon-edit-outline"></i>
            <span style="margin-left: 10px">{{ scope.row.task_name }}</span>
          </template>
        </el-table-column>

        <!-- 标签 -->
        <el-table-column
          label="标签"
          width="100"
          >
          <template slot-scope="scope">
            <el-tag
              v-for="(tag) in scope.row.tags"
              :key="tag"
              :type="tag === '作业' ? 'primary' : 'success'"
              disable-transitions>{{ tag }}</el-tag>
          </template>
        </el-table-column>

        <!-- 起始日期 -->
        <el-table-column
          label="起始日期"
          width="150">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.startDay }}</span>
          </template>
        </el-table-column>

        <!-- 终止日期 -->
        <el-table-column
          label="终止日期"
          width="150">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.endDay }}</span>
          </template>
        </el-table-column>

        <!-- 持续天数 -->
        <el-table-column
          label="持续天数"
          width="100"
          >
          <template slot-scope="scope">
            <span style="color:#409eff;">
              <i class="el-icon-data-analysis"></i> {{ scope.row.interval }}
            </span>
          </template>
        </el-table-column>

        <!-- 剩余天数 -->
        <el-table-column
          label="剩余天数"
          width="100"
          >
          <template slot-scope="scope">
            <span :style="[(scope.row.leftDay <= 3) ? warning : secuery]">
              <i class="el-icon-sort-down"></i> {{ scope.row.leftDay }}
            </span>
          </template>
        </el-table-column>

        <!-- 操作按钮：完成，删除(未完成) -->
        <el-table-column
          fixed="right"
          label="操作">
          <div
            slot-scope="scope"
            :id="scope.row.id"
            class="work"
            >
            <el-tooltip
              effect="dark"
              content="完成"
              placement="right"
              >
              <el-button
                class="waves-effect"
                @click.native.prevent="finishTask(scope.$index, todoListData, $event)"
                type="primary"
                size="small"
                icon="el-icon-check"
                >
              </el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="删除"
              placement="right"
              >
              <el-button
                class="waves-effect"
                @click.native.prevent="deleteTask(scope.$index, todoListData, $event)"
                type="danger"
                size="small"
                icon="el-icon-delete">
              </el-button>
            </el-tooltip>
          </div>
        </el-table-column>

      </el-table>
    </ul>
  </div>
</template>

<script>
import {  Button, Table, TableColumn, Tooltip, Tag } from 'element-ui';
export default {
  props: {
    todoListData: Array
  },
  data(){
    return {
      warning: {
        "color": "red"
      },
      secuery: {
        "color": "#67c23a"
      },
    }
  },
  components: {
    "el-button": Button,
    "el-table": Table,
    "el-table-column": TableColumn,
    "el-tooltip": Tooltip,
    "el-tag": Tag,
  },
  methods: {
    finishTask(index, todoListData, event){
      this.$emit("finishTask", index, todoListData, event)
    },
    deleteTask(index, todoListData, event){
      this.$emit("finishTask", index, todoListData, event)
    },
  }

}
</script>

<style>
#task-displayer > p {
  text-align: center;
  font-size: 2em;
  font-family:'Times New Roman', Times, serif;
  width: 30%;
  margin: 0 auto;
  background-color: rgb(249,227,141);
  padding: 20px;
  margin-bottom: 0.5em;
  border-radius: 40px;
}
</style>

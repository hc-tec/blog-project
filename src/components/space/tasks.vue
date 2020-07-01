<template>
  <div class="user-space-task">
    <p><i class="fa fa-tasks"></i> 看看还有啥任务没有完成呢？</p>
    <div class="user-space-tasklist">
      <neu-table class="tasklist-table" :tableHead="taskListTableHead">
        <neu-table-row
          v-for="data in taskListTableData"
          :key="data._"
          :tableRowData="data">
        </neu-table-row>
      </neu-table>
    </div>
  </div>
</template>

<script>
import { ajaxGet } from '../../elem_compo_encap'
import { TODOLIST } from '../../api'
import { genericError } from '../../func'
export default {
  data () {
    return {
      taskListTableHead: ['待办事项', '标签', '剩余天数'],
      taskListTableData: []
    }
  },
  methods: {
    getTask () {
      const request = () => {
        ajaxGet(
          TODOLIST, { id: this.getUserInfo.uid },
          response, genericError
        )
      }
      const response = (res) => {
        if (res.data.code === 292) {
          for (const task of res.data.data) {
            this.taskListTableData.push({
              _: task.task_name,
              __: task.tags[0],
              ___: task.leftDay
            })
          }
        }
      }
      request()
    }
  },
  mounted () {
    this.getTask()
  }
}
</script>

<style scoped>
.user-space-task {
  max-height: 300px;
  overflow: auto;
}
.user-space-task > * {
  margin-bottom: 15px;
}
.tasklist-table {
  width: 100%;
}
</style>

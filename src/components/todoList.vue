<template>
  <div class="todoList">

    <div id="addTodoList" v-if="this.getUserInfo.power.isLogin">

      <h2>添加任务</h2>

      <el-form label-width="100px" class="demo-ruleForm" :model="addTaskObj">
        <el-form-item label="任务"  required>
          <el-input v-model="addTaskObj.task_name" placeholder="立个flag"></el-input>
        </el-form-item>

        <el-form-item label="标签" required>
          <el-select placeholder="啥类型的flag呢？" v-model="addTaskObj.tag">
            <el-option
              v-for="(tag) in taskTags"
              :key="tag['name']"
              :label="tag['name']"
              :value="tag['name']">
            </el-option>
          </el-select>

          <el-button
            v-if="this.getUserInfo.power.isLogin"
            icon="el-icon-plus"
            style="margin-left: 20px;"
            @click="addTag()">
          </el-button>

        </el-form-item>

        <el-form-item label="任务时间" required>

          <el-col :span="11">
            <el-form-item>
              <el-date-picker
                type="date"
                placeholder="从这天开始吧"
                style="width: 100%;"
                value-format="yyyy-MM-dd"
                v-model="addTaskObj.startDay">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col class="line" :span="2" style="text-align: center;">-</el-col>

          <el-col :span="11">
            <el-form-item>
              <el-date-picker
                type="date"
                placeholder="冲冲冲！"
                style="width: 100%;"
                value-format="yyyy-MM-dd"
                v-model="addTaskObj.endDay">
              </el-date-picker>
            </el-form-item>
          </el-col>

        </el-form-item>

        <el-button type="primary" class="submit_btn waves-effect" @click="addTask()">创建任务</el-button>

      </el-form>
    </div>


    <p>Target</p>
    <ul class="rolldown-list" id="List">
      <el-table
        :data="todoListData"
        class="rolldown-list"
        height="300"
        >

        <el-table-column
          type="index"
          label="序号"
          width="80"
          >
        </el-table-column>

        <el-table-column
          label="待办事项"
          width="300"
          >
          <template slot-scope="scope">
            <i class="el-icon-edit-outline"></i>
            <span style="margin-left: 10px">{{ scope.row.task_name }}</span>
          </template>
        </el-table-column>

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

        <el-table-column
          label="起始日期"
          width="150">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.startDay }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="终止日期"
          width="150">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.endDay }}</span>
          </template>
        </el-table-column>

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
import {Input, Form, FormItem, Button, Select, Option,
         Col, DatePicker, Table, TableColumn, Tooltip, Tag} from 'element-ui';
export default {
  components: {
    "el-input": Input,
    "el-form": Form,
    "el-form-item": FormItem,
    "el-button": Button,
    "el-select": Select,
    "el-option": Option,
    "el-col": Col,
    "el-date-picker": DatePicker,
    "el-table": Table,
    "el-table-column": TableColumn,
    "el-tooltip": Tooltip,
    "el-tag": Tag,
  },
  data(){
    return {
      todoListData: null,
      warning: {
        "color": "red"
      },
      secuery: {
        "color": "#67c23a"
      },
      addTaskObj: {
        task_name: "",
        tag: "",
        startDay: "",
        endDay: ""
      },
      taskTags: []
    }
  },
  methods: {
    addTag: function(){
        this.$prompt("请输入需添加的标签", "标签框框", {
          confirmButtonText: '就决定是你了！',
          cancelButtonText: '要不，换个吧',
        }).then(({value}) => {
          this.asynAddTag(value);
          let id = (this.taskTags[this.taskTags.length-1]['id'] + 1) || 1;
          this.taskTags.push({'id':id,'name':value});
        }).catch((e) => {
          console.log(e)
          this.postMsg("下次一定", 'info');
        })
      },
    asynAddTag: function(name){
      this.axios
        .get(`http://${this.host}/api/newTaskTag`,{
          params: {
            name: name
          }
        }).then(response => {
          let code = response.data['code'];
          let msg = response.data['msg'];
          let info = 'error';
          if(296 == code){
            info = 'success';
          }
          this.postMsg(msg, info);
        }).catch(e => console.log(e))
    },
    getTaskTag: function(){
      this.axios.get(`http://${this.host}/api/showTaskTag`)
        .then(response => {
          this.taskTags = response.data;
        })
    },
    addTask() {
      this.axios.get(`http://${this.host}/api/newTask`, {
        params: {
          user: this.getUserInfo.uid,
          task_name: this.addTaskObj.task_name,
          tag: this.addTaskObj.tag,
          startDay: this.addTaskObj.startDay,
          endDay: this.addTaskObj.endDay
        }
      }).then(response => {
          let code = response.data['code'];
          let msg = response.data['msg'];
          let info = 'error';
          if(290 == code){
            info = 'success';
            this.getAsny();
            Object.keys(this.addTaskObj).forEach(key => {
              this.addTaskObj[key] = "";
            })
          }
          this.postMsg(msg, info);
        })
    },
    getIdByParent(el) {
      let parent = el.currentTarget.parentNode;
      return parent.getAttribute('id');
    },
    deleteTask(index, rows, el) {
      if(this.getUserInfo.power.isLogin){
      let id = this.getIdByParent(el);
      this.$prompt("删归删，说点抛弃我的理由吧", "抛弃框框", {
        confirmButtonText: "抛弃",
        cancelButtonText: "还可以挽留",
      }).then((value) => {
        this.axios
          .get('http://47.115.147.39/api/task/abandonTask.php', {
            params: {
              id: id,
              reason: value
            }
          })
          .then(response => {
            let code = response.data['code'];
            let msg = response.data['msg'];
            let info = 'error';
            if(293 == code){
              info = 'success';
              rows.splice(index, 1);
            }
            this.postMsg(msg, info);
          })
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '不打算抛弃我了?太好了!'
        })
      })
      }else{
        this.postMsg('登录后才能进行相应操作喔', 'info');
      }
    },
    finishTask(index, rows, el) {
      if(this.getUserInfo.power.isLogin){
      let id = this.getIdByParent(el);
      this.$confirm('再点一个按钮，你离成功又更进一步喽，再接再厉!', '走向成功', {
        confirmButtonText: '完成了，所向披靡',
        cancelButtonText: '再让我鸽下，没准就完成了',
        type: 'success'
      }).then(() => {
        this.axios
          .get(`http://${this.host}/api/finishTask`, {
            params: {
              id: id
            }
          })
          .then(response => {
            let code = response.data['code'];
            let msg = response.data['msg'];
            let info = 'error';
            if(291 == code){
              info = 'success';
              rows.splice(index, 1);
            }
            this.postMsg(msg, info);
          })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '别灰心，再战又如何'
        })
      })
      }else{
        this.postMsg('登录后才能进行相应操作喔', 'info');
      }

    },
    update: () => {
      function $(className){
        return document.getElementsByClassName(className)
      }
      var lieleList = $("rolldown-list")[0].children
      for(let i=0;i<lieleList.length;i++){
        var delay = (i / 1)　+ 's'
        lieleList[i].style.animationDelay = delay
      }
    },
    // dateToString: function(date){
    //   var year = date.getFullYear();
    //   var month =(date.getMonth() + 1).toString();
    //   var day = (date.getDate()).toString();
    //   if (month.length == 1) {
    //       month = "0" + month;
    //   }
    //   if (day.length == 1) {
    //       day = "0" + day;
    //   }
    //   var dateTime = year + "-" + month + "-" + day;
    //   return dateTime;
    // },
    // leftDay: function(){

    // },
    // parseStringDate: function(strDay){
    //   return new Date(Date.parse(strDay.replace(/-/g, '/')));
    // },
    // formatDate: function(dateArg) {
    //   const date = new Date(dateArg);
    //   const year = date.getFullYear();
    //   const month = date.getMonth() + 1;
    //   const day = date.getDate();
    //   const formatMonth = month < 10 ? `0${month}` : month;
    //   const formatDay = day < 10 ? `0${day}` : day;
    //   return `${year}-${formatMonth}-${formatDay}`
    // }
    getAsny: function(){
      this.axios
        .get(`http://${this.host}/api/task`,{
          params: {
            id: this.getUserInfo.uid
          }
        })
        .then(response => {
          this.todoListData = response.data['data'] || null;
          let code = response.data['code'];
          let msg = response.data['msg'];
          let info = 'error';
          if(292 === code){
            info = 'success';
          }
          if(630 === code){
            info = '';
          }
          this.postMsg(msg, info);
        })
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.update()
    });
    this.getAsny();
    this.getTaskTag();
    // this.axios
    //   .get('../json/todoList.json')
    //   .then(response => {
    //     let todoList = response.data;
    //     // todoList.forEach(el => {

    //     //   // 将字符串日期解析为时间
    //     //   let endDay = this.parseStringDate(el['endDate']);
    //     //   let startDay = this.parseStringDate(el['startDate']);
    //     //   let now = this.parseStringDate(this.formatDate(new Date()));

    //     //   // 持续时间的时间戳
    //     //   let duringTimestamp = endDay - startDay;
    //     //   // 剩余时间的时间戳
    //     //   let leftTimestamp = endDay - now;

    //     //   // 持续时间天数
    //     //   let duringDay = parseInt(duringTimestamp / (1000 * 60 * 60 * 24));
    //     //   // 剩余时间天数
    //     //   let leftDay = parseInt(leftTimestamp / (1000 * 60 * 60 * 24));
    //     //   todoList['duringDay'] = duringDay;
    //     //   todoList['leftDay'] = leftDay;
    //     // })
    //     this.todoListData = todoList;
    //   })
    //   .catch(e => (console.log(e)))
  }
}
</script>

<style scoped>
.todoList {
  padding: 0 15%;
}
.todoList > p {
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
.rolldown-list * {
  visibility: hidden;
  animation: rolldown 1s 1;
  transform-origin: 50% 0;
  animation-fill-mode: forwards;
}
#List {
  position: relative;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 100px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
@keyframes rolldown {
  0% {
    visibility: visible;
    transform: rotateX(180deg) perspective(500px);
  }
  70% {
    visibility: visible;
    transform: rotateX(-20deg);
  }
  100% {
    visibility: visible;
    transform: rotateX(0deg);
  }
}
#addTodoList {
  width: 750px;
  margin: 0 auto;
  margin-bottom: 5%;
  background-color: #fff;
  padding: 30px 45px 30px 15px;
}
#addTodoList > h2 {
  text-align: center;
  margin-bottom: 3%;
}
.submit_btn {
  width: 40%;
  margin-left: 30%;
}
.work {
  display: flex;
  flex-direction: column;
}
.el-button+.el-button {
  margin-left: 0;
}
.el-button--primary {
  margin-bottom: 10px;
}
@media screen and (max-width: 800px){
  .todoList {
    padding: 0;
  }
  #addTodoList {
    width: 100%;
    padding: 30px 0;
  }
}
</style>

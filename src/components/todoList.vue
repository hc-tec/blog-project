<template>
  <div class="todoList">

    <!-- 任务添加组件 -->
    <task-adder
      :addTaskObj="addTaskObj"
      :taskTags="taskTags"
      @initAddTask="initAddTask($event)"
      @confirmAddTag="confirmAddTag">
    </task-adder>


    <!-- 任务展示组件 -->

    <task-displayer
      :todoListData="todoListData"
      @finishTask="finishTask"
      @deleteTask="deleteTask">
    </task-displayer>


  </div>
</template>

<script>
import { elprompt, ajaxGet, postMsg, elconfirm, ajaxPost } from '../elem_compo_encap'
import taskAdder from './task-adder'
import taskDisplayer from './task-displayer'
export default {
  components: {
    "task-adder": taskAdder,
    "task-displayer": taskDisplayer
  },
  data(){
    return {
      todoListData: null,

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

    confirmAddTag: function(){
      const title = "标签框框";
      const tip_text = "请输入需添加的标签";
      elprompt(
        title, tip_text,
        this.initAddTag, (e)=>(console.log(e), false, {
          confirmButtonText: '就决定是你了！',
          cancelButtonText: '要不，换个吧',
        })
      )
    },
    initAddTag: function(name){
      ajaxGet(
        `http://${this.host}/api/newTaskTag`, {name: name},
        this.succAddTag, (e)=>(console.log(e))
      )
      let id = (this.taskTags[this.taskTags.length-1]['id'] + 1) || 1;
      this.taskTags.push({'id':id,'name':name});
    },
    succAddTag: function(res){
      let code = res.data['code'];
      let msg = res.data['msg'];
      let info = 'error';
      if(296 == code){
        info = 'success';
      }
      postMsg(msg, info);
    },

    getTaskTag: function(){
      ajaxGet(
        `http://${this.host}/api/showTaskTag`, {},
        this.succGetTaskTag, (e)=>(console.log(e))
      )
    },
    succGetTaskTag: function(res){
      this.taskTags = res.data;
    },

    initAddTask: function(task) {
      ajaxGet(
        `http://${this.host}/api/newTask`, {
          user: this.getUserInfo.uid,
          task_name: task.task_name,
          tag: task.tag,
          startDay: task.startDay,
          endDay: task.endDay
        }, this.succAddTask, this.failAddTask
      )
    },
    succAddTask: function(res){
      let code = res.data['code'];
      let msg = res.data['msg'];
      let info = 'error';
      if(290 == code){
        info = 'success';
        this.initGetTask();
        Object.keys(this.addTaskObj).forEach(key => {
          this.addTaskObj[key] = "";
        })
      }
      postMsg(msg, info);
    },
    failAddTask: function(e){
      console.log(e)
      postMsg('任务提交失败', 'danger');
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
              postMsg(msg, info);
            })
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '不打算抛弃我了?太好了!'
          })
        })
      }else{
        postMsg('登录后才能进行相应操作喔', 'info');
      }
    },

    finishTask(index, rows, el) {
      if(this.getUserInfo.power.isLogin){
        let id = this.getIdByParent(el);
        const title = '走向成功';
        const tip_text = '再点一个按钮，你离成功又更进一步喽，再接再厉!';
        elconfirm(
          title, tip_text,
          [id, index, rows], this.initFinishTask, this.cancelFinishTask,
          false, {
            confirmButtonText: '完成了，所向披靡',
            cancelButtonText: '再让我鸽下，没准就完成了',
            type: 'success'
          }
        )
      }else{
        postMsg('登录后才能进行相应操作喔', 'info');
      }

    },
    cancelFinishTask: function(e){
      console.log(e);
      postMsg("别灰心，再战又如何");
    },

    initFinishTask: function(){
      let [id, index, rows, ..._] = arguments;
      ajaxGet(
        `http://${this.host}/api/finishTask`, {id: id},
        this.succFinishTask, this.failFinishTask, [index, rows]
      )
    },
    succFinishTask: function(res){
      let index = arguments[1],
          rows = arguments[2]
      let code = res.data['code'];
      let msg = res.data['msg'];
      let info = 'error';
      if(291 == code){
        info = 'success';
        rows.splice(index, 1);
      }
      postMsg(msg, info);
    },
    failFinishTask: function(e){
      console.log(e);
      postMsg("任务完成失败")
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

    initGetTask: function(){
      ajaxGet(
        `http://${this.host}/api/task`,{id: this.getUserInfo.uid},
        this.succGetTask, this.failGetTask
      )
    },
    succGetTask: function(res){
      this.todoListData = res.data['data'] || null;
      let code = res.data['code'];
      let msg = res.data['msg'];
      let info = 'error';
      if(292 === code){
        info = 'success';
      }
      if(630 === code){
        info = '';
      }
      postMsg(msg, info);
    },
    failGetTask: function(e){
      console.log(e);
      postMsg('获取任务失败','danger');
    }

  },
  mounted(){
    this.$nextTick(() => {
      this.update()
    });
    this.initGetTask();
    this.getTaskTag();
  }
}
</script>

<style>
.todoList {
  padding: 0 15%;
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

.todoList .submit_btn {
  width: 40%;
  margin-left: 30%;
}
.todoList .work {
  display: flex;
  flex-direction: column;
}
.todoList .el-button+.el-button {
  margin-left: 0;
}
.todoList .el-button--primary {
  margin-bottom: 10px;
}
@media screen and (max-width: 800px){
  .todoList {
    padding: 0;
  }
}
</style>

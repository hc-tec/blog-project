<template>
  <div class="todoList">
    <p>Daily Target</p>
    <ul class="rolldown-list" id="List">
      <!-- <li>ONE</li>
      <li>ONE</li>
      <li>ONE</li> -->
      <el-table
        :data="todoListData"
        class="rolldown-list"
        >
        <el-table-column
          type="index"
          label="序号"
          width="80"
          >
        </el-table-column>
        <el-table-column
          prop="startDate"
          label="起始日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="endDate"
          label="终止日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="thing"
          label="待办事项"
          >
        </el-table-column>
      </el-table>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      todoListData: [{
        startDate: "2020-03-06",
        endDate: "2020-03-08",
        thing: "000",
      }, {
        startDate: "2020-03-06",
        endDate: "2020-03-08",
        thing: "000",
      }, {
        startDate: "2020-03-06",
        endDate: "2020-03-08",
        thing: "000",
      }, {
        startDate: "2020-03-06",
        endDate: "2020-03-08",
        thing: "000",
      }]
    }
  },
  methods: {
    update: () => {
      function $(className){
        return document.getElementsByClassName(className)
      }
      var lieleList = $("rolldown-list")[0].children
      for(let i=0;i<lieleList.length;i++){
        var delay = (i / 1)　+ 's'
        lieleList[i].style.animationDelay = delay
      }
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.update()
    })
  }
}
</script>

<style>
.todoList > p {
  text-align: center;
  font-size: 2em;
  font-family:'Times New Roman', Times, serif;
  width: 30%;
  margin: 0 auto;
  background-color: rgb(249,227,141);
  padding: 20px;
  margin-bottom: 0.125em;
  border-radius: 40px;
}
/* .rolldown-list {
  text-align: left;
  padding: 0;
}
.rolldown-list li {
  padding: 1em;
  margin-bottom: 0.125em;
  display: block;
  list-style: none;
} */
.rolldown-list * {
  visibility: hidden;
  animation: rolldown 1s 1;
  transform-origin: 50% 0;
  animation-fill-mode: forwards;
  /* background-color: white; */
}
/* .rolldown-list li:nth-child(2n) {
  background-color: white;
}
.rolldown-list li:nth-child(2n + 1) {
  background-color: #b7acac29;
} */
#List {
  position: relative;
  width: 60%;
  margin: 0 auto;
  margin-bottom: 5%;
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
</style>

<template>
  <div class="block">
    <h1>{{ title }}</h1>
    <div class="radio">
      <el-radio-group v-model="reverse">
        <el-radio :label="false">正序</el-radio>
        <el-radio :label="true">倒序</el-radio>
      </el-radio-group>
    </div>
    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="item,index in timeLineData"
        :key="index"
        :timestamp="item['time']"
        :icon="item['icon']"
        :color="item['color']"
        size="large"
        placement="top">
        <el-card>
          <h4>{{ item['title'] }}</h4>
          <img v-for="img in item['img']" :src="img" width="50%"/>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data(){
    return {
      reverse: false,
      title: "博客项目开发时间轴",
      timeLineData: [
        {
          "icon": "el-icon-more",
          "color": "rgb(0, 255, 250)",
          "time": "2020-03-02",
          "img": [],
          "title":  "加入竞赛，开始博客项目。计划开发六个栏目，\n-首页\n-web前端\n-课堂笔记\n-英语学习\n-今日目标\n-关于",
        },
        {
          "icon": "el-icon-s-home",
          "color": "rgb(0, 255, 250)",
          "time": "2020-03-02",
          "img": [],
          "title":  "确定风格--极简风，并开始设计首页",
        },
        {
          "icon": "el-icon-s-opportunity",
          "color": "rgb(0, 255, 250)",
          "time": "2020-03-03",
          "img": [],
          "title":  "首页大体框架设计完毕，着手设计“英语学习”栏目",
        },
        {
          "icon": "el-icon-s-opportunity",
          "color": "rgb(0, 255, 38)",
          "time": "2020-03-04",
          "img": [],
          "title":  "“英语学习”栏目主页设计完成，着手开发英语阅读页",
        },
        {
          "icon": "el-icon-monitor",
          "color": "rgb(0, 255, 250)",
          "time": "2020-03-04",
          "img": [],
          "title":  "将“web前端”栏目更名为“程序生活”，开始设计此栏目",
        },
        {
          "icon": "el-icon-monitor",
          "color": "rgb(0, 255, 38)",
          "time": "2020-03-05",
          "img": [],
          "title":  "“程序生活”栏目及阅读页开发完成，开始“关于”栏目的设计",
        },
        {
          "icon": "el-icon-user",
          "color": "rgb(0, 255, 38)",
          "time": "2020-03-06",
          "img": [],
          "title":  "“关于”栏目开发完成，并且设计出了 404 页面，至 2020-03-06 14:00 已完成 4 个栏目开发",
        },
        {
          "icon": "el-icon-notebook-2",
          "color": "rgb(0, 255, 38)",
          "time": "2020-03-07",
          "img": [],
          "title":  "开始“课堂笔记”的设计，采用了几个从前写好的组件，开发时间大大缩短。",
        },
        {
          "icon": "el-icon-edit",
          "color": "rgb(0, 255, 250)",
          "time": "2020-03-08",
          "img": [],
          "title": "星期日，补作业中。。。只做了些小修改",
        },
        {
          "icon": "el-icon-finished",
          "color": "rgb(0, 255, 38)",
          "time": "2020-03-09",
          "img": [require('../assets/img/md.jpg')],
          "title": "所有组件全部更新为懒加载导入，并采用动态注册组件的方式引入 .md文件\n完成数据输入。至此，博客开发基本完成。",
        }
      ]
    }
  }
}
</script>

<style>
.radio {
  margin: 0 auto;
  margin-top: 5%;
  margin-bottom: 1%;
}
.block {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
}
.block h4 {
  white-space: pre-line;
}
.block > h1 {
  text-align: center;
  color: white;
  font-family: "宋体";
}
#todoList .el-timeline-item__node {
  align-items: unset;
  color: black;
}
#todoList .el-timeline-item__icon {
  color: inherit;
}
#pageAbout .el-timeline-item__node {
  align-items: unset;
  color: black;
}
#pageAbout .el-timeline-item__icon {
  color: inherit;
}
</style>

<template>
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
          @click="confirmAddTag()">
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

      <el-button
        type="primary"
        class="submit_btn waves-effect"
        @click="initAddTask()">创建任务
      </el-button>

    </el-form>
  </div>
</template>

<script>
import {
  Form, FormItem, Input, Select,
  Option, Button, DatePicker, Col } from 'element-ui'
export default {
  props: {
    taskTags: Array,
    addTaskObj: Object,
  },
  data(){
    return {

    }
  },
  components:  {
    "el-input": Input,
    "el-form": Form,
    "el-form-item": FormItem,
    "el-button": Button,
    "el-select": Select,
    "el-option": Option,
    "el-col": Col,
    "el-date-picker": DatePicker,
  },
  methods: {
    initAddTask: function(){
      this.$emit("initAddTask", this.addTaskObj);
    },
    confirmAddTag: function(){
      this.$emit("confirmAddTag");
    }
  }
}
</script>

<style>
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
@media screen and (max-width: 800px){
  #addTodoList {
    width: 100%;
    padding: 30px 0;
  }
}
</style>

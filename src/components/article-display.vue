<template>
  <div class="content" id="displayer">
    <div class="program-content">
        <!-- 头像 -->
        <div id="avatar">
          <img :src="essay['avatar']"/>
        </div>
        <!-- 评论数量 -->
        <span
          class="comment_num"
          title="评论数">
          <i class="el-icon-chat-line-square"> </i>
          {{ essay['comment_num'] }}
        </span>
        <!-- 标题 -->
        <p class="title">{{ essay['title'] }}</p>
        <!-- 文章信息：创作时间、类别、阅览数、标签 -->
        <div class="article-info">
          <span
            title="创作时间">
            <i class="el-icon-date"></i>
            {{ essay['create_time'] }} •
          </span>

          <span
            style="font-family:Constantia, 华文中宋, 宋体, serif!important;"
            :title="'类别:'+essay['category']">
            <i class="el-icon-data-analysis"></i>
            {{ essay['category'] }} •
          </span>

          <span
            title="阅读次数">
            <i class="el-icon-view"></i>
            {{ essay['click_num'] }}
          </span>

          <span
            v-for="(tag) in essay['tags']"
            :key="tag"
            :title="tag">
            • <i class="el-icon-price-tag"></i>
            {{ tag }}
          </span>
        </div>
        <!-- 文章内容 -->
        <markdown-interpreter
          :article="essay['content']"
          :showAll="false">
        </markdown-interpreter>

        <!-- 文章左上侧的创作者名称 -->
        <div class="tagGroup">
          <span
            id="creator"
            title="创作者">
            <i class="el-icon-user"></i>
            {{ essay['creator']['user_name'] }}
          </span>
          <span
            v-if="essay.weight"
            id="isSticky"
            title="置顶">
            <i class="el-icon-map-location"></i> pinned
          </span>
        </div>
        <!-- 文章操作：编辑、删除 -->
        <el-dropdown
          class="work-btn"
          v-if="getUserInfo.power.isLogin">
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu>



            <el-dropdown-item :id="index+'-'+essay['id']" class="waves-effect">
              <span
                @click="editArticle($event)"
                style="color: #409eff;">
                <i class="el-icon-edit"> 编辑</i>
              </span>
            </el-dropdown-item>

            <el-dropdown-item class="waves-effect">
              <span
                @click="stickyArticle($event, essay.weight)"
                v-if="getUserInfo.power.delArticle"
                style="color: var(--success-color);">
                <i class="el-icon-upload2" v-if="!essay.weight"> 置顶</i>
                <i class="el-icon-download" v-else> 取消置顶</i>
              </span>
            </el-dropdown-item>

            <el-dropdown-item class="waves-effect">
              <span
                @click="delArticle($event)"
                style="color: red;"
                v-if="getUserInfo.power.delArticle || getUserInfo.uid === essay.creator.id">
                <i class="el-icon-delete"> 删除</i>
              </span>
            </el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
        <!-- 查看更多按钮 -->
        <div
          class="lookmore waves-effect waves-float"
          @click="toArticle(essay.id)">
          查看更多<i class="el-icon-d-arrow-right"></i>
        </div>
    </div>
  </div>
</template>

<script>
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
import markdownInterpreter from './markdown-interpreter'
export default {
  props: {
    essay: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  components: {
    "el-dropdown": Dropdown,
    "el-dropdown-menu": DropdownMenu,
    "el-dropdown-item": DropdownItem,
    "markdown-interpreter": markdownInterpreter,
  },
  methods: {
    toArticle: function(id){
      this.$emit("toArticle", id);
    },
    delArticle: function(id){
      this.$emit("delArticle", id);
    },
    editArticle: function(id){
      this.$emit("editArticle", id);
    },
    stickyArticle: function(id, weight) {
      this.$emit('stickyArticle', id, weight);
    }
  }
}
</script>

<style>
#displayer {
  margin-bottom: 80px;
  position: relative;
  background-color: #fff;
  border-radius: 10px;
}
#displayer > p:nth-child(1) {
  font-size: 2em;
  font-family: Georgia, serif;
  font-style: italic;
  margin-bottom: 5%;
}
#displayer .title {
  text-align: center;
  font-size: 2em;
  margin-bottom: 3%;
  margin-top: 30px;
  font-weight: bold;
}
#displayer .program-content {
  padding: 30px 30px;
  position: relative;
  transition: all .8s;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

#displayer .lookmore {
  text-align: center;
  width: 150px;
  margin: 0 auto;
  background: #97dffd;
  color: #fff;
  font-size: 1.2em;
  padding: 1px 15px;
  border-radius: 5px;
  line-height: 2;
  transition: all .3s;
}
#avatar {
  position: absolute;
  width: 70px;
  height: 70px;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);

}
#avatar > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  padding: 4px;
  background-color: #fff;
}
#displayer #creator,
#displayer #isSticky {
  position: absolute;
  left: -16px;
  top: 30px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
  background-color: #97dffd;
  margin: 5px 0 15px 2px;
  font-size: 14px;
  border-radius: 0 4px 4px 0;
  display: inline-block;
  padding: 7px 11px 7px 32px;
  line-height: 1;
}
#displayer #isSticky {
  background-color: #4a00ff69;
  color: white;
  top: -18px;
}
#displayer #creator::after,
#displayer #isSticky::after {
  position: absolute;
  content: "";
  top: 100%;
  left: 0;
  border-top: 0 solid transparent;
  border-right-width: 1em;
  border-right-color: #2b2525;
  border-right-style: solid;
  border-bottom: 1em solid transparent;
  border-left: 0 solid transparent;
  width: 0;
  height: 0;
}
#displayer .article-info {
  text-align: center;
  margin-bottom: 50px;
}
#displayer .article-info span {
  color: red;
}
#displayer .article-info span:nth-child(1) {
  color: #00a7e0;
}
#displayer .article-info span:nth-child(2) {
  color: black;
}
#displayer .article-info span:nth-child(3) {
  color: #67C23A;
}
#displayer .el-dropdown-link {
  font-size: 2em;
}
#displayer .comment_num {
  position: absolute;
  bottom: 10px;
  right: 30px;
}
@media screen and (max-width: 800px){

  #displayer {
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>

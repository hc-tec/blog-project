<template>
<!-- 评论 -->
    <div class="comments-container" id="container">
      <div class="comment-input-area">
        <!-- 根据是否登录进行页面切换 -->
        <template v-if="this.getUserInfo.power.isLogin">
          <p style="color:#00a1d6;" v-show="reply">
            {{ replied_user_name ? `@${replied_user_name}` : '' }}
            <i class="el-icon-circle-close" @click="cancelReply"></i>
          </p>
          <!-- 这个组件用来发送 emoji 表情  -->
          <twemoji-textarea
            :emojiData="emojiDataAll()"
            :emojiGroups="emojiGroups()"
            @enterKey="onEnterKey"
            style="width: 80%;float: left;">
          </twemoji-textarea>
          <!-- 发布评论按钮 -->
          <button
            class="waves-effect"
            @click="initSubmitComment()">发布评论</button>
        </template>
        <!-- 用户未登录 -->
        <p v-else>
          <router-link to="/login" style="color:red;">登录</router-link>
          后才可发表评论喔
        </p>
      </div>
      <!-- 如果有评论 -->
      <template v-if="total">
        <ul id="comments-list" class="comments-list">
          <!-- 评论列表 -->
          <li v-for="com in comment" :key="com.id">
            <div class="comment-main-level">
              <!-- 头像 -->
              <div class="comment-avatar">
                <img :src="com.user.avatar" alt="avatar"></div>
              <!-- 评论主体 -->
              <div class="comment-box">
                <div class="comment-head">
                  <!-- 名称 -->
                  <h6
                    :class="['comment-name', com.user.name === article.creator.user_name ? 'by-author' : '']">
                    <a>{{ com.user.name }}</a>
                  </h6>
                  <!-- 评论时间 -->
                  <span>{{ com.create_time }}</span>
                  <!-- 回复按钮 -->
                  <i
                    class="el-icon-s-fold"
                    title="回复"
                    :id="com.id"
                    @click="getCommentId($event)">
                  </i>
                </div>
                <!-- 评论内容，需要进行v-html解析 -->
                <div class="comment-content" v-html="com.message">
                </div>
              </div>
            </div>
            <!-- 回复列表 -->
            <ul class="comments-list reply-list">
              <li v-for="comm in com.reply" :key="comm.id">
                <!-- 头像 -->
                <div class="comment-avatar">
                  <img :src="comm.user.avatar" alt="avatar">
                </div>
                <!-- 评论主体 -->
                <div class="comment-box">
                  <div class="comment-head">
                    <!-- 名称 -->
                    <h6
                      :class="['comment-name', comm.user.name === article.creator.user_name ? 'by-author' : '']">
                      <a>{{ comm.user.name }}</a>
                    </h6>
                    <!-- 评论时间 -->
                    <span>{{ comm.create_time }}</span>
                    <!-- 暂未设置二级评论回复功能 -->
                  </div>
                  <!-- 评论内容 -->
                  <div class="comment-content" v-html="comm.message">
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <!-- 评论分页 -->
        <el-pagination
            background
            style="text-align:center;"
            layout="prev, pager, next"
            :total="total/pagi_count*10"
            @current-change="pageChange"
            :current-page.sync="page">
        </el-pagination>

      </template>
      <!-- 无评论时显示的内容 -->
      <p style="text-align:center;" v-else>还没有人评论，来抢个沙发吧</p>
	  </div>
</template>

<script>
import { Pagination } from 'element-ui';
import {
  TwemojiTextarea
} from '@kevinfaguiar/vue-twemoji-picker';
import EmojiAllData from '@kevinfaguiar/vue-twemoji-picker/emoji-data/zh/emoji-all-groups.json';
import EmojiDataAnimalsNature from '@kevinfaguiar/vue-twemoji-picker/emoji-data/zh/emoji-group-animals-nature.json';
import EmojiDataFoodDrink from '@kevinfaguiar/vue-twemoji-picker/emoji-data/zh/emoji-group-food-drink.json';
import EmojiGroups from '@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json';

export default {
  props: {
    comment: {
      type: Array || Object ,
    },
    reply: {
      type: Boolean,
      default: false
    },
    replied_comment_id: {
      type: String,
      default: '-1'
    },
    replied_user_name: {
      type: String,
      default: ''
    },
    total: {
      type: Number,
      default: 0
    },
    pagi_count: {
      type: Number,
      default: 5
    },
    article: {
      type: Object
    }
  },
  data(){
    return {
      page: 1,
    }
  },
  components: {
    'twemoji-textarea': TwemojiTextarea,
    "el-pagination": Pagination,
  },
  methods: {
    pageChange(){
      this.$emit("pageChange", this.page)
    },
    onEnterKey(e) {
      this.initSubmitComment(e)
    },
    emojiDataAll() {
      return EmojiAllData;
    },
    emojiGroups() {
      return EmojiGroups;
    },
    cancelReply(){
      this.$emit("cancelReply");
    },
    initSubmitComment(el){
      this.$emit("initSubmitComment", el);
    },
    getCommentId(el){
      this.$emit("getCommentId", el);
    }
  }
}
</script>

<style>
.comments-list .comment-avatar {
	width: 65px;
	height: 65px;
	position: relative;
	z-index: 0;
	float: left;
	border: 3px solid #FFF;
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
	-webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.2);
	-moz-box-shadow: 0 1px 2px rgba(0,0,0,0.2);
	box-shadow: 0 1px 2px rgba(0,0,0,0.2);
	overflow: hidden;
}

.comments-list .comment-avatar img {
	width: 100%;
	height: 100%;
}

.reply-list .comment-avatar {
	width: 50px;
	height: 50px;
}

.comment-main-level:after {
	content: '';
	width: 0;
	height: 0;
	display: block;
	clear: both;
}

.comments-list .comment-box {
	width: 680px;
	float: right;
	position: relative;
	-webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.15);
	-moz-box-shadow: 0 1px 1px rgba(0,0,0,0.15);
	box-shadow: 0 1px 1px rgba(0,0,0,0.15);
}

.comments-list .comment-box:before, .comments-list .comment-box:after {
	content: '';
	height: 0;
	width: 0;
	position: absolute;
	display: block;
	border-width: 10px 12px 10px 0;
	border-style: solid;
	border-color: transparent #FCFCFC;
	top: 8px;
	left: -11px;
}

.comments-list .comment-box:before {
	border-width: 11px 13px 11px 0;
	border-color: transparent rgba(0,0,0,0.05);
	left: -12px;
}

.reply-list .comment-box {
	width: 610px;
}
.comment-box .comment-head {
	background: #FCFCFC;
	padding: 10px 12px;
	border-bottom: 1px solid #E5E5E5;
	overflow: hidden;
	-webkit-border-radius: 4px 4px 0 0;
	-moz-border-radius: 4px 4px 0 0;
	border-radius: 4px 4px 0 0;
}

.comment-box .comment-head i {
	float: right;
	margin-left: 14px;
	position: relative;
	top: 2px;
	color: #A6A6A6;
	cursor: pointer;
	-webkit-transition: color 0.3s ease;
	-o-transition: color 0.3s ease;
	transition: color 0.3s ease;
}

.comment-box .comment-head i:hover {
	color: #03658c;
}

.comment-box .comment-name {
	color: #283035;
	font-size: 14px;
	font-weight: 700;
	float: left;
	margin-right: 10px;
}

.comment-box .comment-name a {
	color: #283035;
}

.comment-box .comment-head span {
	float: left;
	color: #999;
	font-size: 13px;
	position: relative;
	top: 1px;
}

.comment-box .comment-content {
	background: #FFF;
	padding: 12px;
	font-size: 15px;
	color: #595959;
	-webkit-border-radius: 0 0 4px 4px;
	-moz-border-radius: 0 0 4px 4px;
	border-radius: 0 0 4px 4px;
  white-space: pre-line;
}
.comment-box .comment-content > img {
  max-width: 92%;
  max-height: 300px;
}
.comment-box .emoji {
  height: 25.6px;
}

.comment-box .comment-name.by-author, .comment-box .comment-name.by-author a {color: #03658c;}
.comment-box .comment-name.by-author:after {
	content: 'author';
	background: #2ad6e2;
	color: #FFF;
	font-size: 12px;
	padding: 3px 5px;
	font-weight: 700;
	margin-left: 10px;
	-webkit-border-radius: 3px;
	-moz-border-radius: 3px;
	border-radius: 3px;
}
.comment-input-area {
  width: 100%;
}
.comment-input-area textarea {
  width: 80%;
  display: inline-block;
  box-sizing: border-box;
  background-color: #f4f5f7;
  border: 1px solid #e5e9ef;
  overflow: auto;
  border-radius: 4px;
  color: #555;
  height: 65px;
  transition: 0s;
  padding: 5px 10px;
  line-height: normal;
  outline: none;
}
.comment-input-area button {
  width: 15%;
  height: 65px;
  margin-left: 5%;
  padding: 4px 15px;
  font-size: 14px;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  min-width: 60px;
  vertical-align: top;
  cursor: pointer;
  background-color: #66ccff;
  border: 1px solid #66ccff;
  transition: .1s;
  user-select: none;
  outline: none;
}
.comment-input-area:hover textarea {
  background-color: #fff;
  border-color: #66ccff;
}
.comments-container {
	margin: 60px auto 15px;
	width: 768px;
  padding: 100px;
  background: #e3e3e366;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

.comments-container h1 {
	font-size: 36px;
	color: #283035;
	font-weight: 400;
}

.comments-container h1 a {
	font-size: 18px;
	font-weight: 700;
}

.comments-list {
	margin-top: 30px;
	position: relative;
}

.comments-list:before {
	content: '';
	width: 2px;
	height: 100%;
	background: #c7cacb;
	position: absolute;
	left: 32px;
	top: 0;
}

.comments-list:after {
	content: '';
	position: absolute;
	background: #c7cacb;
	bottom: 0;
	left: 27px;
	width: 7px;
	height: 7px;
	border: 3px solid #dee1e3;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	border-radius: 50%;
}

.reply-list:before, .reply-list:after {display: none;}
.reply-list li:before {
	content: '';
	width: 60px;
	height: 2px;
	background: #c7cacb;
	position: absolute;
	top: 25px;
	left: -55px;
}


.comments-list li {
	margin-bottom: 15px;
	display: block;
	position: relative;
}

.comments-list li:after {
	content: '';
	display: block;
	clear: both;
	height: 0;
	width: 0;
}

.reply-list {
	padding-left: 88px;
	clear: both;
	margin-top: 15px;
}
@media screen and (max-width: 800px){
  .comments-container {
		width: 480px;
	}

	.comments-list .comment-box {
		width: 450px;
	}

	.reply-list .comment-box {
		width: 320px;
  }
  .comments-container {
    width: 90%;
    padding: 50px;
  }
}
#twemoji-textarea {
  outline: none;
}
@media screen and (max-width: 500px){
  .comment-input-area button {
    margin: 0;
  }
  .comments-list .comment-box {
    width: 100%;
  }
  .reply-list .comment-box {
    width: 90%;
  }
}
</style>

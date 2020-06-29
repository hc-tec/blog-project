<template>
  <section class="chat-room">
    <!-- {{ chat_obj_name }} -->
    <p class="head-user-name">uwsgi 的 WebSocket 解决不了，怕是一年都开发不完了</p>
    <!-- 消息展示窗口 -->
    <div class="chat-messages" ref="messages">
      <template v-for="msg in history_message">
        <div class="send-time-content" :key="msg.message+msg.user_name">
          <span>{{ msg.send_time }}</span>
        </div>
        <div
          :key="msg.message+msg.user_name"
          v-if="msg.user_name !== getUserInfo.uuser_name"
          class="message-content">
          <img :src="msg.avatar" class="user-avatar" />
          <p class="message" v-html="msg.message"></p>
        </div>
        <div
          :key="msg.message+msg.user_name"
          v-else
          class="message-content-self">
          <p class="message" v-html="msg.message"></p>
          <img :src="msg.avatar" class="user-avatar-self" />
        </div>
      </template>
    </div>

    <div class="input-component">
      <div
        class="message-inputer"
        ref="message"
        @keyup.ctrl.enter="initSend"
        contentEditable="true" ></div>

      <el-button
        class="send-btn"
        type="primary"
        ref="send"
        @click="initSend"
        disabled>发送 (Ctrl+Enter)
      </el-button>

    </div>

  </section>
</template>

<script>
import {Input, Button} from 'element-ui'
import { GetDateTimeToString, DateTimeDiff } from '../func'
import { ajaxGet } from '../elem_compo_encap'
export default {
  components: {
    "el-input": Input,
    "el-button": Button,
  },
  data(){
    return {
      socket: '',
      chat_obj_name: '',
      id: this.getUserInfo !== 'annoy' ? this.getUserInfo.uid : 0,
      history_message: [],
    }
  },
  methods: {
    connect(chatObj){
      this.chat_obj_name = chatObj.user_name;
      this.modifyChatWindow();
      let chat_room_Id = parseInt(this.id) < parseInt(chatObj.id) ? `u${this.id}-${chatObj.id}` : `${chatObj.id}-u${this.id}`;
      // this.initGetHistoryMessages(chat_room_Id);

      this.socket = new WebSocket(`ws://${this.host}/websocket/chat/${chat_room_Id}`);
      this.socket.onopen = _ => {
        console.log("WebSocket 成功连接");
      }
      this.socket.onmessage = (e) => {
        this.messagePretty(e);
      }
    },
    valid: (e) => {
      return e !== null && e !== "undefined";
    },
    messagePretty(e){
      if(this.valid(e.data)){
        // 将 json 字符串转化为 json
        let data = JSON.parse(e.data);
        // 信息发送时间
        // 计算两段信息发送时间差，如果超过五分钟，则不会再显示发送时间
        let msg = this.$refs.messages.querySelectorAll('.send-time-content');
        let exist = (_ => msg.length > 0)();
        let last_msg_time = exist ? msg[msg.length-1].textContent : null

        let now_msg_time = data['send_time'];

        if(last_msg_time && DateTimeDiff(last_msg_time, now_msg_time)){

        } else {
          let time_div = document.createElement('div');
          time_div.className = 'send-time-content';

          let time = document.createElement('span');
          time.textContent = data['send_time'];

          time_div.appendChild(time);
          this.$refs.messages.appendChild(time_div);
        }



        // 信息内容：包含头像、发送的信息
        let message_div = document.createElement('div');
        message_div.className = 'message-content';

        let avatar = document.createElement('img');
        avatar.src = data['avatar'];
        avatar.className = 'user-avatar';

        let message = document.createElement('p');
        message.className = 'message'
        message.innerHTML = data['message'];

        // 如果是自己的话，则特殊处理
        if(this.getUserInfo.uid === data['id']){
          message_div.className = 'message-content-self';
          avatar.className = 'user-avatar-self';
          message_div.appendChild(message);
          message_div.appendChild(avatar);

        } else {
          message_div.appendChild(avatar);
          message_div.appendChild(message);
        }

        this.$refs.messages.appendChild(message_div)
      }
    },
    initSend(){
      let val = this.$refs.message.innerHTML;
      let data = {
        id: this.getUserInfo.uid,
        user_name: this.getUserInfo.uuser_name,
        avatar: this.getUserInfo.uavatar,
        message: val,
        send_time: GetDateTimeToString()
      }
      this.send(JSON.stringify(data));
      // 情况聊天框内容
      this.$refs.message.innerHTML = '';
    },
    send(message){
      this.socket.send(message);
    },
    close(){
      this.socket.close()
      console.log("WebSocket 已关闭");
    },
    modifyChatWindow(){
      this.$refs.messages.innerHTML = '';
    },
    initGetHistoryMessages(chat_room_Id){
      ajaxGet(
        `http://${this.host}/websocket/chatInfo/${chat_room_Id}`, {},
        this.succGetHistoryMessages, (e)=>console.log(e),
      )
    },
    succGetHistoryMessages(res){
      this.history_message = res.data.results;
    }
  },
  mounted(){
    // this.connect();
  },
  beforeDestroy(){
    this.close()
  }
}
</script>

<style>
.chat-room {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.chat-messages {
  height: 600px;
  border-top: 1px solid #80808026;
  background-color: rgb(245,245,245);
  padding: 0 40px;
  overflow: scroll;
}
.chat-messages > * {
  margin-top: 16px;
}
.chat-messages > div:nth-last-child(1){
  margin-bottom: 20px;
}
.head-user-name {
  padding: 20px 0 20px 20px;
  font-size: 1.3em;
  font-weight: bold;
  background-color: rgb(245,245,245);
}
.input-component {
  background-color: #fff;
  height: 40%;
  padding: 20px;
  position: relative;
  border-top: 1px solid #80808026;
}
.message-inputer {
  width: 100%;
  height: 100%;
  outline: none;
  overflow-wrap: anywhere;
}
.send-btn {
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 150px;
}
.send-time-content {
  text-align: center;
}
.send-time-content > span {
  color: white;
  background-color: rgb(218,218,218);
  padding: 0 4px;
  border-radius: 3px;
}
.user-avatar,
.user-avatar-self {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
}
.user-avatar-self {
  margin-left: 10px;
}
.message-content,
.message-content-self {
  display: flex;
}
.message-content-self {
  justify-content: flex-end;
}
.message {
  background-color: #fff;
  padding: 10px;
  padding-bottom: 0;
  outline: #80808036 solid 1px;
}
.message:hover {
  background-color: rgb(248,248,248);

}
</style>

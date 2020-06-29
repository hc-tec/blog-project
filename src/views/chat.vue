<template>
  <div class="chat">

    <friend-list
      ref="friendList"
      :friends="briefUserInfo"
      @getChatObjID="getChatObjID($event)" />
    <chat-window ref="chatWindow" />
  </div>
</template>

<script>
import friendsList from '../components/friends_list'
import chatWindow from '../components/chat_websocket'
import { ajaxGet } from '../elem_compo_encap'
export default {
  components: {
    "friend-list": friendsList,
    "chat-window": chatWindow,
  },
  data(){
    return {
      briefUserInfo: [],
    }
  },
  methods: {
    initGetBriefUserInfo(){
      ajaxGet(
        `http://${this.host}/api/usersBriefInfo`,{},
        this.succGetBriefUserInfo, (e)=>(console.log(e))
      )
    },
    succGetBriefUserInfo(res){
      this.briefUserInfo = res.data;
      // 执行 WebSocket 默认连接，找到第一个与登录用户ID不相等的对象
      res.data.some((data, index) => {
        if(data.id !== this.getUserInfo.uid){
          this.$refs.chatWindow.connect(res.data[index]);
          return true;
        }
      })

    },
    getChatObjID(chatObj){
      this.$refs.chatWindow.connect(chatObj);
    }
  },
  mounted(){
    this.initGetBriefUserInfo()
  }
}
</script>

<style>
.chat {
  width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  height: 700px;
  margin-top: 100px;
  margin-bottom: 100px;
  border: 1px solid #80808036;
}
</style>

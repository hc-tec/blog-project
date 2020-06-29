<template>
  <ul class="friend-list" ref="friendList">
    <li
      v-show="friend.id !== getUserInfo.uid"
      v-for="(friend,index) in friends"
      :key="friend.user_name"
      @click="getChatObjID(index)"
      :class=" index === 0 ? 'active': ''">
      <div class="friend-avatar">
        <img :src="friend.avatar">
      </div>
      <h3 :id="friend.id">{{ friend.user_name }}</h3>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    friends: Array
  },
  methods: {
    getChatObjID(index){
      this.$emit("getChatObjID", this.friends[index]);
      // 清楚兄弟节点的 active class
      this.$refs.friendList.children.forEach(child => {
        child.className = '';
      });
      this.$refs.friendList.children[index].className = 'active';
    },
  }
}
</script>

<style scoped>
.friend-list {
  width: 300px;
  background-color: #cfd0d24f;
  overflow: scroll;
}
.friend-list li {
  display: flex;
  align-items: center;
  padding: 16px;
  transition: background-color .5s;
}
.friend-list .active {
  background-color: rgba(155, 162, 162, 0.27);
}
.friend-list li:hover {
  background-color: rgb(210,211,212);
}
.friend-list li h3 {
  margin-left: 15px;
}
.friend-list .friend-avatar {
  width: 50px;
  height: 50px;
}
.friend-list .friend-avatar > img {
  width: 100%;
  height: 100%;
}
</style>

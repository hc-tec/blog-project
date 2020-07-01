<template>
  <div id="user-space" :style="{
    'background-image': !!this.getUserInfo.ubgImage ? `url(${this.getUserInfo.ubgImage})` : '#fff'
  }">
    <section class="user-space-left">
      <userInfo />
      <subscribe />
      <poem />
    </section>
    <section class="user-space-middle">
      <writerModule />
      <tasks />
      <creativeCollection />
    </section>
    <section class="user-space-right">
      <rank />
      <recommend />
    </section>
  </div>
</template>

<script>
import userInfo from '../components/space/user-info'
import writerModule from '../components/space/writer-module'
import tasks from '../components/space/tasks'
import creativeCollection from '../components/space/creative-collection'
import subscribe from '../components/space/subscribe'
import rank from '../components/space/rank'
import recommend from '../components/space/recommend-articles'
import poem from '../components/space/daily/poem'
export default {
  components: {
    userInfo,
    writerModule,
    tasks,
    creativeCollection,
    subscribe,
    rank,
    recommend,
    poem,
  }
}
</script>

<style>
#user-space {
  padding: 40px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 60px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
#user-space > section {
  margin-right: 20px;
}

#user-space > section > * {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  box-shadow: var(--shadow);
  border-radius: 10px;
}
.user-space-left {
  width: 250px;
}
.user-space-middle {
  width: 700px;
}
.user-space-right {
  width: 250px;
}
.user-space-middle .fa,
.user-space-right .fa {
  color: var(--second-color) !important;
}
</style>

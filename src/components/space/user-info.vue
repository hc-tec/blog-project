<template>
  <div class="user-space__user-info">
    <div class="avatar-setting">
      <neu-avatar
        :src="this.getUserInfo.uavatar"
        shadow="light">
      </neu-avatar>
      <div class="ready-setting">
        <i
          class="el-icon-setting set-icon"
          @click="openSetting"></i>
      </div>
      <div class="ready-setting-layer"></div>
    </div>
    <i class="fa fa-file-text-o"> {{ this.getUserInfo.uarticle_num }} 篇创作</i>
    <neu-divider />
    <socialLink :socialLink="socialLink" />
    <setting ref="userSpaceSetting" />
    <div
      ref="userSpaceSeetingLayer"
      class="setting-layer"
      @click="closeSetting"></div>
  </div>
</template>

<script>
import socialLink from './social-link'
import setting from './setting'
export default {
  components: {
    socialLink,
    setting
  },
  data () {
    return {
      socialLink: [
        {
          icon: 'fa fa-github',
          link: this.getUserInfo.ugithub,
          color: '#000'
        }
      ]
    }
  },
  methods: {
    openSetting() {
      const set = this.$refs.userSpaceSetting.$el;
      const layer = this.$refs.userSpaceSeetingLayer;
      set.style.opacity = '1';
      set.style.zIndex = '200';
      layer.style.opacity = '1';
      layer.style.zIndex = '150';
      document.body.style.position = 'fixed';
      document.body.style.overflow = 'hidden';
    },
    closeSetting() {
      const set = this.$refs.userSpaceSetting.$el;
      const layer = this.$refs.userSpaceSeetingLayer;
      set.style.opacity = '0';
      set.style.zIndex = '-1';
      layer.style.opacity = '0';
      layer.style.zIndex = '-1';
      document.body.style.position = 'relative';
      document.body.style.overflow = 'auto';
    }
  }
}
</script>

<style>
.user-space__user-info {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.user-space__user-info > * {
  margin-bottom: 15px;
}
.fa-file-o {
  font-size: 1.3em;
  line-height: .7;
}
.avatar-setting {
  position: relative;
}
.avatar-setting:hover .ready-setting-layer {
  opacity: 1;
}
.avatar-setting:hover .set-icon {
  transform: translateY(0) rotate(0);
  cursor: pointer;
}
.ready-setting {
  position: absolute;
  visibility: visible;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.ready-setting-layer {
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: #13121257;
  opacity: 0;
  transition: opacity .3s;
}
.set-icon {
  color: white;
  font-size: 3em;
  z-index: 10;
  transform: translateY(80px) rotate(180deg);
  transition: transform .5s;
}
.setting-layer {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
  background: #13121257;
  transition: opacity .3s, z-index .3s;
}
</style>

<template>
  <div class="user-space-setting">
    <neu-tabs
      class="user-space-setting-tabs"
      style="width: 90%;height: 500px;">
      <neu-tab-pane title="背景图片">
        <imgSetting  />
      </neu-tab-pane>
      <neu-tab-pane title="信息修改">
        <infoSetting />
      </neu-tab-pane>
    </neu-tabs>
  </div>
</template>

<script>
import imgSetting from './setting/img-setting'
import infoSetting from './setting/info-setting'
export default {
  components: {
    imgSetting,
    infoSetting
  },
  data() {
    return {

    }
  },
  methods: {

  }

}
</script>

<style>

.user-space-setting {
  width: 800px;
  min-height: 500px;
  background-color: #fff;
  position: fixed;
  border-radius: var(--primary-radius);
  z-index: -1;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: var(--shadow);
  visibility: visible;
  opacity: 0;
  padding: 30px;
  transition: opacity .3s, z-index .3s;
}
.user-space-setting .neumorphic-tab-pane > div > * {
  margin-bottom: 10px;
}
</style>

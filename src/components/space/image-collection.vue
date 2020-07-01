<template>
  <div class="user-space-image-collection">
    <div class="left-collection">
      <figure
        v-for="img in imageCollection.slice(0, imageNum/2)"
        :key="img">
        <el-image :src="img" lazy/>
        <div class="collection-layer" @click="setBgImage(img)"></div>
      </figure>
    </div>
    <div class="right-collection">
      <figure
        v-for="img in imageCollection.slice(imageNum/2)"
        :key="img">
        <el-image :src="img" lazy/>
        <div class="collection-layer" @click="setBgImage(img)"></div>
      </figure>
    </div>
  </div>
</template>

<script>
import { ajaxGet } from '../../elem_compo_encap'
import { genericError } from '../../func'
import { IMAGE_COLLECTION } from '../../api'
import { Image } from 'element-ui'
import MessageBox from '../../MessageBox'
export default {
  components: {
    "el-image": Image
  },
  data() {
    return {
      imageCollection: [],
      imageNum: 0,
      pageCount: 50,
    }
  },
  methods: {
    getImageCollection() {
      const request = () => {
        ajaxGet(
          IMAGE_COLLECTION, {},
          response, genericError
        )
      }
      const response = (res) => {
        if(res.data.code === 284) {
          this.imageCollection = res.data.data
          this.imageNum = res.data.data.length
          this.pageCount = this.imageNum < this.pageCount ? this.imageNum : this.pageCount;
        }
      }
      request()
    },
    setBgImage(imgUrl) {
      const config = {
        title: '设置背景图片',
        message: '确定选择此图片作为背景图片？',
        confirmBtnText: '确认',
        cancelBtnText: '取消',
        resolve: () => {
          this.$emit('setBgImage', imgUrl);
        },
        reject: () => (void 0),
      }
      MessageBox.confirm(config)
    }
  },
  mounted() {
    this.getImageCollection()
  }
}
</script>

<style>
.user-space-image-collection {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.left-collection,
.right-collection {
  width: 49.9%;
  display: flex;
  flex-direction: column;
}
.user-space-image-collection figure {
  width: 100%;
  height: 100%;
  margin-bottom: .4px;
  position: relative;
}
.user-space-image-collection .el-image {
  display: inline;
}
.collection-layer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: #13121257;
  opacity: 0;
  transition: all .3s;
}
.user-space-image-collection figure:hover .collection-layer {
  opacity: 1;
  cursor: pointer;
}
</style>

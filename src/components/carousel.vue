<template>
  <div id="carousel">
    <el-carousel
      indicator-position="outside"
      trigger="click"
      :height="adjustScreen()">
      <el-carousel-item
        v-for="(img,index) in carou_img"
        :key="img['id']"
        class="carousel-content">
        <img :src="img['img']" class="img">
        <span v-if="getUserInfo.power.modifyCarousel" @click="delCarousel(index,img['id'])"><i class="el-icon-delete"></i></span>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { Carousel,CarouselItem } from 'element-ui';

export default {
  components: {
    "el-carousel": Carousel,
    "el-carousel-item": CarouselItem,
  },
  data(){
    return {
      carou_img: null,
      pc: "500px",
      mobile: '300px',
    }
  },
  methods: {
    adjustScreen: function(){
      let width = document.body.clientWidth;
      return document.body.clientWidth > 500 ? this.pc : this.mobile;
    },
    delCarousel: function(index,id){
      this.$confirm("确定取消运用此图片，是否继续？", "轮播图框框", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
        }).then(() => {
          this.carou_img.splice(index, 1);
          this.axios.delete(`http://${this.host}/main/carousel/${id}/`);
        })
    },
    getCarousle:function(){
      this.axios.get(`http://${this.host}/main/carousel/`)
        .then(response => {
          this.carou_img = response.data;
        })
    }
  },
  mounted(){
    this.getCarousle();
  }
}
</script>

<style>

.carousel-content > span {
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
}
#carousel {
  background-color: white;
  padding: 5px;
  min-width: 500px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

#carousel .img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0.5rem auto;
  max-width: 100%;
  max-height: 500px;
  border-radius: 0.2rem;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
}
.el-icon-arrow-right,
.el-icon-arrow-left {
  width: auto;
  height: auto;
}
@media screen and (max-width: 800px){
  #carousel {
    min-width: unset;
  }
}
</style>

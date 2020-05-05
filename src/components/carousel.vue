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
        <span v-if="getUserInfo.power.modifyCarousel" @click="initDelCarousel(index,img['id'])"><i class="el-icon-delete"></i></span>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { Carousel,CarouselItem } from 'element-ui';
import { elconfirm, ajaxGet, ajaxDel } from '../elem_compo_encap'
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
    initDelCarousel: function(index,id){
      const title = "轮播图框框";
      const tip_text = "确定取消运用此图片，是否继续？";
      elconfirm(
          title, tip_text, arguments,
          this.succDelCarousel, ()=>{},
      )
    },
    succDelCarousel: function(args){
      let [index, id, ..._] = arguments
      this.carou_img.splice(index, 1);
      ajaxDel(
        `http://${this.host}/main/carousel/${id}/`,{},
        ()=>{}, ()=>{}
      )
    },
    initGetCarousle:function(){
      ajaxGet(
        `http://${this.host}/main/carousel/`, {},
        this.succGetCarousel, (e)=>(console.log(e))
      )
    },
    succGetCarousel: function(res){
      this.carou_img = res.data;
    }
  },
  mounted(){
    this.initGetCarousle();
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

<template>
  <div id="carousel">
    <el-carousel
      indicator-position="outside"
      trigger="click"
      height="500px">
      <el-carousel-item v-for="img in carou_img">
        <router-link :to="img['link']">
          <img :src="img['img']" class="img">
        </router-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: [""],
  data(){
    return {
      carou_img: [
        {
        "img": "http://titt-blog.com/image/树林.jpg",
        "link": "/",
        },
        {
        "img": require("../assets/img/cut.jpg"),
        "link": "/",
        },
        {
        "img": "http://titt-blog.com/image/城市晚霞.jpg",
        "link": "/",
        },

      ]
    }
  }
}
</script>

<style>
#carousel {
  background-color: white;
  padding: 5px;

  border: 1px ridge #ddd;
  min-width: 500px;
}

.img {
  width: 100%;
  height: 100%;

}
.el-icon-arrow-right,
.el-icon-arrow-left {
  width: auto;
  height: auto;
}
</style>

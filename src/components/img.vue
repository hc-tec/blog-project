<template>
  <div id="image-admin">
    <h1>图片管理</h1>
    <div>
    <div class="img" v-for="(img,index) in img_list" :key="img">

      <div class="img-content">
        <el-image :src="img" lazy></el-image>
        <div class="layer"></div>
      </div>
      <span v-if="false">{{ name(img) }}</span>
      <div class="operate">
        <span><a :href="img" target="_blank" style="color:white;"><i class="el-icon-search"></i></a></span>
        <span><i class="el-icon-delete" @click="delImg(index)"></i></span>
        <span><i class="el-icon-upload2" @click="loadCarousel(index)"></i></span>
      </div>

    </div>
    </div>
  </div>
</template>

<script>
import {Image} from 'element-ui';
export default {
  components: {
    "el-image": Image,
  },
  data(){
    return {
      img_list: [],
    }
  },
  methods: {
    delImg: function(index){
      this.$confirm("此操作将永久删除此图片，是否继续？", "删除框框", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let img_name = this.name(this.img_list[index])
        this.img_list.splice(index,1);
        this.axios
          .delete(`http://${this.host}/api/files`,{
            params: {
              file_name: img_name
            }
          })
          .then(response => {
            let code = response.data['code'];
            let msg = response.data['msg'];
            this.postMsg(msg)
          })
      }).catch((e) => console.log(e))
    },
    getImg: function(){
      this.axios
        .get(`http://${this.host}/api/files`)
        .then(response => {
          let code = response.data['code'];
          let msg = response.data['msg'];
          if(284 === code){
            this.img_list = response.data['data'];
          } else {
            this.postMsg(msg)
          }
        })
    },
    name: (url) => {
      let img_split = url.split('/');
      return img_split[img_split.length-1];
    },
    loadCarousel: function(index){
      this.$confirm("确定运用此图片至首页轮播图，是否继续？", "轮播图框框", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
    }).then(() => {
      let img = this.img_list[index];
      this.axios.post(`http://${this.host}/main/carousel/`, `img=${img}`)
        .then(response => {
          if(response.data['img'] === img){
            this.postMsg('成功运用至轮播图', 'success');
          }
        })
    })
  },
  },
  mounted(){
    this.getImg();
  }
}
</script>

<style scoped>
.img {
  margin-bottom: 50px;
  position: relative;
}
.operate {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  z-index: 1;
  color: white;
}
.operate > * {
  cursor: pointer;
  margin-right: 10px;

}
.img-content {
  width: 300px;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}
.img-content > img {
  display: flex;
  margin: 0.5rem auto;
  max-width: 92%;
  max-height: 500px;
  border-radius: 0.2rem;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
  transition: 0.4s;
}
.layer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: #514c4c70;
  opacity: 0;
  transition: all .3s;
}
.img:hover .layer {
  opacity: 1;
}
.img:hover .operate {
  display: block;
}
#image-admin {
  padding: 20px;
  background-color: #fff;
  width: 1100px;
  margin: 0 auto;
  margin-top: 50px;
}
#image-admin > div:nth-child(2) {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
#image-admin > h1 {
  text-align: center;
  margin-bottom: 30px;
}


</style>

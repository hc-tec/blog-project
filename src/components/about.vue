<template>
  <div id="about">

    <!-- <div id="info">
      <div class="img-content">
        <router-link
          to="/admin"
          :style="this.getUserInfo.power.viewVistorStatus ? '':notToAdmin">
          <img :src="content['img']" width="100%" height="100%"/>
        </router-link>
      </div>
      <el-collapse v-model="activeName" class="info-content" accordion>
        <el-collapse-item
          style="white-space: pre-wrap;"
          v-for="(info,anal) in content['content']"
          :key="info"
          :title="anal"
          >{{ info }}
        </el-collapse-item>
      </el-collapse>

      <div class="about">
        <a class="bg_links social portfolio"
            :href="this.getUserInfo.ugithub"
            target="_blank"
            title="Github">
            <span class="icon"></span>
        </a>
        <a class="bg_links social dribbble"
            href="javascript:void(0)"
            :title="'QQ Number:' + this.getUserInfo.uqq">
            <span class="icon"></span>
        </a>
        <a class="bg_links logo"></a>
      </div>

    </div>
    <div class="night" id="night">
      <div class="shooting_star" v-for="i in 20" :key="i"></div>
    </div> -->

    <div class="info-content">

      <div class="out-info">
        <h1>{{ content.uuser_name === 'annoy' ? 'Titto' : content.uuser_name }}</h1>
        <h4>{{ content.uqq }}</h4>
        <div class="article_num">
          共发布
            <h2>
              {{ content.uarticle_num }}
            </h2>
          篇博文
          <i class="el-icon-folder-checked"></i>
        </div>
      </div>

      <div class="figure">
        <img :src="content.uavatar"/>
      </div>

      <div class="info-details">
        <p>Register-Time：</p>
          <p>{{ content.uregis_time || '无'}}</p>
        <p>Hobby：</p>
          <p>{{ content.uhobby || '无' }}</p>
        <p>Profile：</p>
          <p>{{ content.uprofile || '无' }}</p>
        <p>Github：</p>
          <p>{{ content.ugithub || '无' }}</p>
      </div>
    </div>



  </div>
</template>

<script>
export default {
  data(){
    return {
      notToAdmin: {
        "pointer-events": "none"
      },
      data: {},
      img: "",
      content: {},
      activeName: '1',
      name: 1,
      content: this.getUserInfo
    }
  },
}
</script>


<style>
/* src="../assets/css/aboutLink.css" */
#about {
  width: 100%;
}
.info-content {
  width: 1170px;
  margin: 0 auto;
  position: relative;
}
.info-details {
  background-color: rgb(246,246,246);
  margin-top: 30px;
  padding: 30px 30px 30px 500px;
}
.info-details > p:nth-child(even) {
  padding-left: 20px;
  margin: 10px 0;
}
.figure {
  position: absolute;
  top: -50px;
  left: 10%;
}
.figure > img {
  height: 300px;
  width: 300px;
  border-radius: 50%;
}
.out-info {
  padding-left: 500px;
}
.out-info * {
  display: inline;
}
.out-info > h1 {
  font-size: 3em;
}
.out-info > h4 {
  margin-left: 40px;
  color: gray;
}
.out-info h2 {
  font-size: 4em;
  position: relative;
  margin: 0 30px;
}
.out-info  h2::before {
  content: "[";
  position: absolute;
  left: -30px;
}
.out-info  h2::after {
  content: "]";
  position: absolute;
  right: -20px;
}
.article_num {
  margin-left: 150px;
}
@media screen and (max-width: 800px){
  .info-content {
    width: 100%;
    margin-top: 150px;
  }
  .out-info,
  .info-details {
    padding-left: 30px;
  }
  .out-info {
    padding-top: 200px;
    text-align: center;
  }
  .out-info * {
    display: block;
  }
  .out-info h4 {
    margin: 10px 0;
  }
  .article_num {
    margin: 0;
  }
  .figure {
    top: -150px;
    left: 50%;
    transform: translateX(-50%);
  }

}
</style>

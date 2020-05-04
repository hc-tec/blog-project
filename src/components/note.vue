<template>
  <div class="note" id="note">

    <div class="note-content" v-for="subInfo,subTitle in subjectNote">
      <div class="note-title">
        <p class="ch-title eng-title">
          {{ subTitle.split(' ')[0] }}
        </p>
      </div>
      <div class="note-info">


        <div v-for="info,title in subInfo">
          <span></span>
          <p class="note-img-content">
            <a :href="'/学习资料/' + title + '.pdf'" target="_blank">
              <div class="container">
                <div class="box">
                  <div class="cover">
                    <img :src="info.img">
                  </div>
                </div>
              </div>
            </a>
          </p>

          <p>{{ title }}</p>
          <div class="classic_btn">
            <a :href="'/学习资料/' + title + '.pdf'" target="_blank">
              预览
            </a>
            <a :href="'/学习资料/' + title + '.zip'" target="_blank">
              下载
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {

  components: {
    pdf,
  },
  data(){
    return {
      subjectNote: {
        // "大学物理 Physical": {
        //   "质点运动": {
        //     "img": require("../../public/学习资料/[www.javascriptcn.com]JavaScript权威指南(第6版)(中文版).jpg"),
        //   },
        // },
        // "高数 AdvancedMathematics": {
        //   "微分方程": {
        //     "img": require("../assets/img/IvfoDk30JnI.jpg"),
        //   },
        //   "极限": {
        //     "img": require('../assets/img/tKl7qYVsvbU.jpg'),
        //   }
        // }
      },
    }
  },
  mounted(){
    this.axios
      .get("../json/books.json")
      .then(response => {
        this.subjectNote = response.data
      }).catch(e => {
        console.log(e)
    })
  }
}
</script>

<style src="../assets/css/note-compo.css"></style>
<style scoped>
  button {
    cursor: pointer;
    outline: 0;
    width: 180px;
    height: 48px;
    border-radius: 8px;
    background-color: #2C3138;
    margin-top: 40px;
    overflow: hidden;
    -webkit-transform: scale(.7);
            transform: scale(.7);
}
img {
  width: 100%;
  height: 250px;
}
button::after {
    content: "";
    position: relative;
    top: -40px;
    display: block;
    width: 48px;
    height: 107%;
    background-color: #000;
    margin-top: -1px;
    margin-left: -7px;
    border-radius: 6px 0 0 6px;
    background-repeat: no-repeat;
    background-position: center;
}

button::before {
    content: "";
    display: block;
    width: 48px;
    height: 46px;
    margin-left: -7px;
    margin-top: -1px;
    -webkit-transition: all 200ms cubic-bezier(0.25, 0.75, 0.5, 1.25);
    transition: all 200ms cubic-bezier(0.25, 0.75, 0.5, 1.25);
}


.box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-transition: all .3s ease-out;
    transition: all .3s ease-out;
    will-change: transform;
}



.cover {
    -webkit-transition: all 400ms ease-in-out;
    transition: all 400ms ease-in-out;
    will-change: transform;
}

.cover img {
    -webkit-transition: all 260ms ease-in-out;
    transition: all 260ms ease-in-out;
}

.box .cover::after {
    content: "";
    z-index: -99;
    position: absolute;
    top: 20px;
    left: -20px;
    display: block;
    width: 160px;
    height: 214px;
    opacity: 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 160px 214px;
    -webkit-filter: blur(24px);
            filter: blur(24px);
    -webkit-transition: all 260ms ease-in-out;
    transition: all 260ms ease-in-out;
    will-change: transform;
    -webkit-transform: scale(.6);
            transform: scale(.6);
}

.box:hover .cover::after {
    opacity: 1;
    -webkit-transform: scale(1);
            transform: scale(1);
}
#note .container,
#note .box,
#note .cover {
  margin: 0;
}
</style>

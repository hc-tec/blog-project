<template>
  <div id="about">
    <div id="info">
      <div class="img-content">
        <img :src="content['img']" width="100%" height="100%"/>
      </div>
      <el-collapse v-model="activeName" class="info-content" accordion>
        <el-collapse-item
          v-for="info,anal in content['content']"
          :title="anal"
          >
          {{ info }}
        </el-collapse-item>
      </el-collapse>

      <div class="about">
        <a class="bg_links social portfolio"
            href="https://github.com/ASP-CC"
            target="_blank"
            title="Github">
            <span class="icon"></span>
        </a>
        <a class="bg_links social dribbble"
            href="https://dribbble.com/rafaelalucas"
            target="_blank"
            title="">
            <span class="icon"></span>
        </a>
        <a class="bg_links social linkedin"
            href="http://titt-blog.com/%E5%8D%9A%E5%AE%A2.html"
            target="_blank"
            title="My Blog">
            <span class="icon"></span>
        </a>
        <a class="bg_links logo"></a>
      </div>

    </div>
    <div class="night" id="night">
      <div class="shooting_star" v-for="i in 20"></div>
    </div>



  </div>
</template>

<script>
export default {
  data(){
    return {
      data: {},
      img: "",
      content: {},
      activeName: '1',
      name: 1,
      content: {
        "img": "./jsonImg/artical-img/person_img.jpg",
        "content": {
          "Identify身份": "1",
          "Hobby兴趣": "1",
          "IndividualResume个人简介": "1"
        }
      },
    }
  },
}
</script>

<style src="../assets/css/aboutLink.css"></style>
<style>
#about {
  width: 100%;
}
.img-content {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  opacity: .7;
  z-index: 2;
}
#info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  position: relative;
  margin-bottom: 15%;
}
.info-content {
  width: 60%;
  margin: 5% auto;
  border-radius: 30px;
  overflow: hidden;
  border: none;
  z-index: 2;
}
.el-collapse-item__wrap {
  border: none;
}
.el-collapse-item__header {
  background: linear-gradient(-45deg, #5f91ff, rgb(26, 165, 159));
  padding-left: 5%;
  padding-right: 1%;
  border: none;
  font-size: 1.5em;
  font-family: "宋体";
}
.el-collapse-item__content {
  background: linear-gradient(-45deg, #5f91ff, rgb(26, 165, 159));
  padding: 2% 0 2% 13%;
  border: none;
  line-height: 25px;
  font-size: 1.2em;
  font-family: Georgia, serif;
  transition: all .5s;
}
.el-collapse-item__header:hover {
  opacity: .9;
}

#page-1 {
  width: 100%;
}
.night {
  position: absolute;
  top: 0;
  left: 10%;
  width: 1100px;
  height: 700px;
  transform: rotateZ(45deg); }

.shooting_star {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 2px;
  background: linear-gradient(-45deg, #5f91ff, rgba(0, 0, 255, 0));
  border-radius: 999px;
  filter: drop-shadow(0 0 6px #699bff);
  animation: tail 3000ms ease-in-out infinite, shooting 3000ms ease-in-out infinite; }
  .shooting_star::before, .shooting_star::after {
    content: '';
    position: absolute;
    top: calc(50% - 1px);
    right: 0;
    height: 2px;
    background: linear-gradient(-45deg, rgba(0, 0, 255, 0), #5f91ff, rgba(0, 0, 255, 0));
    transform: translateX(50%) rotateZ(45deg);
    border-radius: 100%;
    animation: shining 3000ms ease-in-out infinite; }
  .shooting_star::after {
    transform: translateX(50%) rotateZ(-45deg); }
  .shooting_star:nth-child(1) {
    top: calc(50% - -46px);
    left: calc(50% - 156px);
    animation-delay: 7412ms; }
    .shooting_star:nth-child(1)::before, .shooting_star:nth-child(1)::after, .shooting_star:nth-child(1)::after {
      animation-delay: 7412ms; }
  .shooting_star:nth-child(2) {
    top: calc(50% - -107px);
    left: calc(50% - 299px);
    animation-delay: 4567ms; }
    .shooting_star:nth-child(2)::before, .shooting_star:nth-child(2)::after, .shooting_star:nth-child(2)::after {
      animation-delay: 4567ms; }
  .shooting_star:nth-child(3) {
    top: calc(50% - -82px);
    left: calc(50% - 241px);
    animation-delay: 1055ms; }
    .shooting_star:nth-child(3)::before, .shooting_star:nth-child(3)::after, .shooting_star:nth-child(3)::after {
      animation-delay: 1055ms; }
  .shooting_star:nth-child(4) {
    top: calc(50% - -88px);
    left: calc(50% - 289px);
    animation-delay: 7517ms; }
    .shooting_star:nth-child(4)::before, .shooting_star:nth-child(4)::after, .shooting_star:nth-child(4)::after {
      animation-delay: 7517ms; }
  .shooting_star:nth-child(5) {
    top: calc(50% - -190px);
    left: calc(50% - 9px);
    animation-delay: 11ms; }
    .shooting_star:nth-child(5)::before, .shooting_star:nth-child(5)::after, .shooting_star:nth-child(5)::after {
      animation-delay: 11ms; }
  .shooting_star:nth-child(6) {
    top: calc(50% - -58px);
    left: calc(50% - 180px);
    animation-delay: 8282ms; }
    .shooting_star:nth-child(6)::before, .shooting_star:nth-child(6)::after, .shooting_star:nth-child(6)::after {
      animation-delay: 8282ms; }
  .shooting_star:nth-child(7) {
    top: calc(50% - -31px);
    left: calc(50% - 44px);
    animation-delay: 9230ms; }
    .shooting_star:nth-child(7)::before, .shooting_star:nth-child(7)::after, .shooting_star:nth-child(7)::after {
      animation-delay: 9230ms; }
  .shooting_star:nth-child(8) {
    top: calc(50% - 170px);
    left: calc(50% - 296px);
    animation-delay: 4283ms; }
    .shooting_star:nth-child(8)::before, .shooting_star:nth-child(8)::after, .shooting_star:nth-child(8)::after {
      animation-delay: 4283ms; }
  .shooting_star:nth-child(9) {
    top: calc(50% - -48px);
    left: calc(50% - 274px);
    animation-delay: 3517ms; }
    .shooting_star:nth-child(9)::before, .shooting_star:nth-child(9)::after, .shooting_star:nth-child(9)::after {
      animation-delay: 3517ms; }
  .shooting_star:nth-child(10) {
    top: calc(50% - 181px);
    left: calc(50% - 186px);
    animation-delay: 9854ms; }
    .shooting_star:nth-child(10)::before, .shooting_star:nth-child(10)::after, .shooting_star:nth-child(10)::after {
      animation-delay: 9854ms; }
  .shooting_star:nth-child(11) {
    top: calc(50% - -134px);
    left: calc(50% - 246px);
    animation-delay: 7774ms; }
    .shooting_star:nth-child(11)::before, .shooting_star:nth-child(11)::after, .shooting_star:nth-child(11)::after {
      animation-delay: 7774ms; }
  .shooting_star:nth-child(12) {
    top: calc(50% - 122px);
    left: calc(50% - 114px);
    animation-delay: 3535ms; }
    .shooting_star:nth-child(12)::before, .shooting_star:nth-child(12)::after, .shooting_star:nth-child(12)::after {
      animation-delay: 3535ms; }
  .shooting_star:nth-child(13) {
    top: calc(50% - 135px);
    left: calc(50% - 126px);
    animation-delay: 4417ms; }
    .shooting_star:nth-child(13)::before, .shooting_star:nth-child(13)::after, .shooting_star:nth-child(13)::after {
      animation-delay: 4417ms; }
  .shooting_star:nth-child(14) {
    top: calc(50% - -137px);
    left: calc(50% - 208px);
    animation-delay: 6549ms; }
    .shooting_star:nth-child(14)::before, .shooting_star:nth-child(14)::after, .shooting_star:nth-child(14)::after {
      animation-delay: 6549ms; }
  .shooting_star:nth-child(15) {
    top: calc(50% - 64px);
    left: calc(50% - 31px);
    animation-delay: 3199ms; }
    .shooting_star:nth-child(15)::before, .shooting_star:nth-child(15)::after, .shooting_star:nth-child(15)::after {
      animation-delay: 3199ms; }
  .shooting_star:nth-child(16) {
    top: calc(50% - 45px);
    left: calc(50% - 68px);
    animation-delay: 2338ms; }
    .shooting_star:nth-child(16)::before, .shooting_star:nth-child(16)::after, .shooting_star:nth-child(16)::after {
      animation-delay: 2338ms; }
  .shooting_star:nth-child(17) {
    top: calc(50% - 52px);
    left: calc(50% - 104px);
    animation-delay: 5944ms; }
    .shooting_star:nth-child(17)::before, .shooting_star:nth-child(17)::after, .shooting_star:nth-child(17)::after {
      animation-delay: 5944ms; }
  .shooting_star:nth-child(18) {
    top: calc(50% - -138px);
    left: calc(50% - 236px);
    animation-delay: 8161ms; }
    .shooting_star:nth-child(18)::before, .shooting_star:nth-child(18)::after, .shooting_star:nth-child(18)::after {
      animation-delay: 8161ms; }
  .shooting_star:nth-child(19) {
    top: calc(50% - 106px);
    left: calc(50% - 261px);
    animation-delay: 6336ms; }
    .shooting_star:nth-child(19)::before, .shooting_star:nth-child(19)::after, .shooting_star:nth-child(19)::after {
      animation-delay: 6336ms; }
  .shooting_star:nth-child(20) {
    top: calc(50% - 138px);
    left: calc(50% - 199px);
    animation-delay: 8239ms; }
    .shooting_star:nth-child(20)::before, .shooting_star:nth-child(20)::after, .shooting_star:nth-child(20)::after {
      animation-delay: 8239ms; }

@keyframes tail {
  0% {
    width: 0; }
  30% {
    width: 100px; }
  100% {
    width: 0; } }
@keyframes shining {
  0% {
    width: 0; }
  50% {
    width: 30px; }
  100% {
    width: 0; } }
@keyframes shooting {
  0% {
    transform: translateX(0); }
  100% {
    transform: translateX(300px); } }
@keyframes sky {
  0% {
    transform: rotate(45deg); }
  100% {
    transform: rotate(405deg); } }

/*# sourceMappingURL=star.css.map */

#star_word {
  position: absolute;
  top: 35%;
  text-align: center;
  font-size: 3em;
  transform: translate(-50%);
  left: 50%;
  letter-spacing: 3px;
  font-family: "宋体";
  line-height: 60px;
  color: white;
}
</style>

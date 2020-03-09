<template>
  <div class="note">

    <div class="note-content" v-for="subInfo,subTitle in subjectNote">
      {{ getTitle(subTitle) }}
      <div class="note-title">
        <p class="ch-title">
          {{ chTitle }}
        </p>
        <p class="eng-title">
          {{ engTitle }}
        </p>
      </div>
      <div class="note-info">
        <div v-for="info,title in subInfo">
          <p class="note-img-content">
            <router-link :to="'/noteInfo/' + chTitle + '-' + title">
              <img :src="info.img">
            </router-link>
          </p>
          <p>{{ title }}</p>
          <div class="classic_btn">
            <router-link :to="'/noteInfo/' + chTitle + '-' + title">
              查看更多
            </router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return {
      chTitle: "",
      engTitle: "",
      subjectNote: {
        "大学物理 Physical": {
          "质点运动": {
            "img": require("../assets/img/0TH1H1rq_eY.jpg"),
          },
        },
        "高数 AdvancedMathematics": {
          "微分方程": {
            "img": require("../assets/img/IvfoDk30JnI.jpg"),
          },
          "极限": {
            "img": require('../assets/img/tKl7qYVsvbU.jpg'),
          }
        }
      },
    }
  },
  methods: {
    getTitle: function(title){
      [this.chTitle, this.engTitle] = title.split(' ')
    },
  }
}
</script>

<style src="../assets/css/note-compo.css"></style>

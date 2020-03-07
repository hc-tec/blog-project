<template>
  <!-- <div id="pageHead">
    <div id="nav">
        <ul>
          <li style="padding:.6% 0 0 10%;margin-right:10%;">
            <router-link id="img" to="/">
               <img src="../assets/img/person_img.jpg" width="50" />
            </router-link>
          </li>
          <li v-for="item in navList">
            <template v-for="site,name in item">
              <router-link :to="site" v-html="name"></router-link>
            </template>
          </li>
        </ul>
    </div>
  </div> -->
  <div class="area">
        <nav class="main-menu" id="menu">
            <ul>
                <li v-for="ele in navList">
                    <router-link :to="ele['link']">
                        <i
                        :class="ele['img']"
                        :style="iconStyle"
                        ></i>
                        <span class="nav-text">
                            {{ ele['text'] }}
                        </span>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>

export default {
  name: "pageHead",
  props: ["navList"],
  data () {
    return {
      iconStyle: {
            "display": "table-cell",
            "vertical-align": "middle",
            "font-size": "1.3em",
        },

      // navList: [
      //   {"首页": '/'},
      //   {"心理设备": '/mental_equip'},
      //   {"关于": '/about'},
      // ],


      listStyleObj: {
        "height": "auto",
        "padding": 0,
      },
      archStyleObj: {
        "text-decoration": "none",
        "font-size": "1.4em",
        "padding": "1.5em 1.2em",
      },


    }
  },

}

</script>
<style src="../assets/css/nav.css"></style>
<style scoped>
  /* #pageHead {
    overflow: hidden;
    margin-bottom: 6%;
  }
  #nav {
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 70px;
  transition: all .5s;
  background-color: white;
  border-bottom: 1px ridge #ddd;
}
  #nav:hover {
    box-shadow: rgb(198, 198, 198) 0px 0px 20px;
  }
  ul {
  list-style-type: none;
  width: 100%;
  overflow: hidden;
}
  li {

}
  a:not(#img) {
  text-decoration: none;
  display: block;
  padding: 1.5em 1.25em;
  font-size: 1em;
  transition: all .5s;
  color: black;
  border-radius: 20px;
  font-family: "宋体";
  font-size: 1em;
  font-weight: bold;
}
  a:not(#img):hover {
    color: #42b983;
}

  #img {
    border-radius: 50%;
    overflow: hidden;
  }
  .active {
    color: #42b983;
  } */

</style>

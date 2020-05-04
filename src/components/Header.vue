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

                <!-- <li v-show="!this.getUserInfo.isLogin">
                  <router-link to="/login">
                  <i class="el-icon-lollipop" :style="iconStyle"></i>
                  <span class="nav-text">登录</span>
                  </router-link>
                </li> -->

                <li v-for="(ele) in this.navList" :key="ele.link">
                  <router-link :to="ele['link']" class="waves-effect">
                    <i
                    :class="ele['img']"
                    :style="iconStyle"
                    ></i>
                  </router-link>
                </li>

                <el-dropdown>
                  <li>
                    <router-link to="">
                      <span class="el-dropdown-link">
                        <i
                          class="el-icon-more"
                          :style="iconStyle"
                        ></i>
                      </span>
                    </router-link>

                    <el-dropdown-menu>
                      <el-dropdown-item
                        v-for="item in moreProject"
                        :key="item.text"
                        :icon="item.img"
                        class="waves-effect">
                        <router-link :to="item.link" class="more">
                          {{ item.text }}
                        </router-link>
                      </el-dropdown-item>
                    </el-dropdown-menu>

                  </li>
                </el-dropdown>
            </ul>
        </nav>
    </div>

</template>

<script>

export default {
  name: "pageHead",
  // props: ["navList"],
  data () {
    return {
      iconStyle: {
            "display": "table-cell",
            "vertical-align": "middle",
            "font-size": "1.3em",
      },

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
  methods: {
    adjustScreen: function(){
      let width = document.body.clientWidth;
      if(width <= 500){
        let el = this.navList.pop();
        this.moreProject.push(el);
        console.log(this.moreProject)
        this.$forceUpdate()
      }
    },
  },
  mounted(){
    this.adjustScreen();
    ;
  }
}

</script>
<style src="../assets/css/nav.css" scoped></style>
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

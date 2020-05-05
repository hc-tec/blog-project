<template>
  <div class="area">
    <!-- 导航栏 -->
    <nav class="main-menu" id="menu">

      <ul>
        <!-- navList 为全局变量，global.js 文件中 -->
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
            <!-- 主体部分导航 -->
            <router-link to="">
              <span class="el-dropdown-link">
                <i
                  class="el-icon-more"
                  :style="iconStyle"
                ></i>
              </span>
            </router-link>

            <!-- 更多部分导航 -->
            <el-dropdown-menu>
              <!-- moreProject 为全局变量，global.js 文件中 -->
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
import {Dropdown, DropdownMenu, DropdownItem} from 'element-ui';

export default {
  components: {
    "el-dropdown": Dropdown,
    "el-dropdown-menu": DropdownMenu,
    "el-dropdown-item": DropdownItem,
  },
  name: "pageHead",
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

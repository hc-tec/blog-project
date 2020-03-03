<template>
  <div id="pageHead">
    <div id="nav">
        <ul>
          <li style="padding:.6% 0 0 10%;margin-right:10%;">
            <router-link id="img" to="/">
               <img src="../assets/img/person_img.jpg" width="70" />
            </router-link>
          </li>
          <li v-for="item in navList">
            <template v-for="site,name in item">
              <router-link :to="site">{{ name }}</router-link>
            </template>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "pageHead",
  props: ["navList"],
  data () {
    return {

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

<style scoped>
  #pageHead {
    overflow: hidden;
    margin-bottom: 8%;
  }
  #nav {
  z-index: 100;
  position: fixed;
  width: 100%;
  transition: box-shadow .5s;
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
  float: left;
}
  a:not(#img) {
  text-decoration: none;
  display: block;
  padding: 2em 1.5em;
  font-size: 1em;
  transition: all .5s;
  color: black;
  border-radius: 20px;
  font-family: "宋体";
  font-size: 1.2em;
  font-weight: bold;
}
  a:not(#img):hover {
  color: #42b983;

}
  #img {
    border-radius: 50%;
    overflow: hidden;
  }

</style>

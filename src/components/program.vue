<template>
  <div id="program">
    <div id="steps">
      <ul class="navUl">
        <li v-for="v,k in data"
            @click="navGetLink($event)"
            :class="k">
          {{ k }}
          <span :href="'#'+k"></span>
        </li>
      </ul>
    </div>
    <div id="part">
      <div class="content" v-for="essays,key in data">
        <p :id="key">{{ key }}</p>
        <div class="program-content">
          <div v-for="essay in essays"
              @mouseenter="moveEnter($event)"
              @mouseleave="moveLeave($event)">
            <p class="title">{{ essay['title'] }}</p>
            <p class="para">{{ modiPara(essay['para']) }}</p>
            <span title="发布时间">
              <i class="el-icon-time"></i>
            </span>
            <span class="time">{{ essay['publicDay'] }}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span title="来源">
              <i class="el-icon-place"></i>
            </span>
            <span v-html="source(essay['source'])"></span>
            <router-link :to="essay['link']+key+'-'+essay['title']">
              查看更多
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/js/steps'
export default {
  data(){
    return {
      data: {},
      active: 1,
      flag: true,
    }
  },
  methods: {
    modiPara: (para) => {
      return para.slice(0, 100) + "......"
    },
    source: (sour) => {
      if("原创" === sour)
        return "<span class='source'>原创</span>"
      else
        return `<span class="other">${sour}</span>`
    },
    moveEnter: (el) => {
      let childList = el.currentTarget.children
      let len = childList.length
      let a = childList[len-1]
      a.style.top = 0
    },
    moveLeave: (el) => {
      let childList = el.currentTarget.children
      let len = childList.length
      let a = childList[len-1]
      a.style.top = "-40%"
    },
    navModi: (el) => {
      let ele = el.currentTarget
      ele.children[0].classList.add("activeSpan")
    },
    navCut: (el) => {
      let ele = el.currentTarget
      ele.children[0].classList.remove("activeSpan")
    },
    navGetLink: (el) => {
      let ele = el.currentTarget
      let archorId = ele.getAttribute('class')
      document.getElementById(archorId).scrollIntoView()
      // ele.classList.add("active")
      // ele.children[0].classList.add("activeSpan")
      // //兄弟节点清楚样式
      // var p = ele.parentNode.children
      // for(var i =0,pl= p.length;i<pl;i++) {
      //   if(p[i] !== ele) {
      //     p[i].classList.remove("active")
      //     p[i].children[0].classList.remove('activeSpan')
      //   }
      // }
    },
    scroll: function(){
      if(this.flag){
        this.flag = false
        var liFlag = false
        var eleFlag = null
        let divParent = document.getElementById("part")
        let childList = divParent.querySelectorAll("p")
        let ulParent = document.getElementsByClassName("navUl")
        let lichildList = ulParent[0].children
        let pList = []
        let bodyTop = window
        for(let j=0;j*3<childList.length;j++){
          pList.push(childList[j*3])
        }
        let currentScrollPosition = window.pageYOffset
        for(let p of pList){
          if(30 >= (p.offsetTop-currentScrollPosition)){
            let className = p.id
            let li = document.getElementsByClassName(className)
            li[0].classList.add("active")
            li[0].children[0].classList.add("activeSpan")
            liFlag = true
            eleFlag = li[0]
          }
          if(liFlag){
            for(let li of lichildList){
              if(li !== eleFlag){
                li.classList.remove("active")
                li.children[0].classList.remove("activeSpan")
              }
            }
          }
        }
        var se = setInterval(() => {
          this.flag = true
          clearInterval(se)
        }, 0);
      }
    }
  },
  mounted(){
    this.axios
      .get('../json/program.json')
      .then(response => (this.data = response.data))
      .catch(e => (console.log(e)))
    window.addEventListener("scroll", this.scroll)
  },
  beforeDestroy(){
    window.removeEventListener("scroll", this.scroll)
  }

}
</script>

<style>

#steps {
  width: 80px;
  top: 50%;
  transform: translateY(-50%);
  position: fixed;
  left: 10%;
  /* z-index: -1; */
}
.navUl {
  list-style-type: none;
  direction: rtl;
  position: relative;
}
.navUl::before {
  content: '';
  position: absolute;
  width: 1px;
  top: 0;
  bottom: 0;
  margin: 22px 0;
  right: 3.5px;
  background-color: rgb(7, 200, 235);
}
.navUl > li {
  width: 100%;
  line-height: 50px;
  font-size: 14px;
  font-weight: 700;
  padding-right: 19px;
  position: relative;
  cursor: pointer;
  transition: all .5s linear;
}
.navUl > li:hover {
  color: rgb(66,185,131);
}
.active {
  color: rgb(66,185,131);
}
.activeSpan {
  background-color: rgb(66,185,131);
}
li > span {
  width: 10px;
  height: 10px;
  position: absolute;
  right: 0;
  top: 22px;
  border-radius: 50%;
  background-color: #E7E7E7;
  transition: all .5s linear;
}
#part {
  background: #fff;
  border: 1px ridge #ddd;
  padding: 20px 25px;
  width: 70%;
  margin-left: 20%;
}
#program {
  display: flex;
}
.content {
  margin-bottom: 5%;
}
.content > p:nth-child(1) {
  font-size: 2em;
  font-family: Georgia, serif;
  font-style: italic;
  margin-bottom: 5%;
}
.title {
  text-align: center;
  font-size: 1.5em;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  margin-bottom: 3%;
}
.program-content {
  padding: 10px 20px;
  background: rgb(250, 246, 246);
  margin-bottom: 5%;
  transition: all .8s;
  overflow: hidden;
}
.program-content span {
  cursor: pointer;
}
.program-content span:hover {
  color: rgb(66,185,131);
}
.program-content:hover {
  box-shadow: 5px 5px 10px #e0d6d6, -5px -5px 10px #dad8d8;;
}
.program-content > div {
  position: relative;
}

.program-content > div > a {
  position: absolute;
  top: -40%;
  right: 0;
  width: 20px;
  transition: all .3s;
  background-color: rgb(8,219,247);
  padding: 5px 10px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  border-radius: 5px;
  color: white;
}
.program-content > div > a:hover {
  color: #000;
}
.para {
  white-space: pre-line;
  line-height: 25px;
  font-size: 1.2em;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-weight: bold;
  margin-bottom: 4%;
}
.time,
.source,
.other {
  margin-left: 12px;
  padding: 5px 20px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
  font-weight: bold;
}
.time {
  font-family: Georgia, serif;
  background-color: rgb(8, 219, 247);
}
.source {
  background-color: rgb(29, 165, 29);
}
.other {
  background-color: rgb(241,241,241);
  color: black;
}
</style>

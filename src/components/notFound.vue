<template>
  <div class="notFound">
    <!-- 404 组件 -->
    <h1>404</h1>
    <div id="error">
      <p>The <span>Url</span> You Linked Is <span>Not Founded!</span><br />
      Please <span>Checked</span> The <span>Url</span> And <span>Relinked</span>.</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      se: null,
    }
  },
  methods: {
    single() {
      function $(id){
        return document.getElementById(id)
      }
      var sourInfo = $("error").innerHTML.toString()
      $("error").innerHTML = ""

      var i = 0
      this.se = setInterval(() => {
        $("error").innerHTML = sourInfo.slice(0, i) + '|'
        i++
        if(i === sourInfo.length){
          $("error").innerHTML = sourInfo
          clearInterval(this.se)
        }
      }, 40)
    }
  },
  beforeDestroy(){
    clearInterval(this.se);
  },
  mounted(){
    this.$nextTick(() => {
      this.single()
    })
  }
}
</script>

<style scoped>
#error {
  font-size: 1.5em;
  color: #8abeb7;
  font-family: 'Times New Roman', Times, serif;
  word-spacing: 5px;
  letter-spacing: 2px;
}
span {
  color: #f0c674;
}
.notFound {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-image: linear-gradient(120deg, #002bff 0%, #ff0000 100%);
  height: 100vh;
}
h1 {
    font-size: 45vw;
    text-align: center;
    position: absolute;
    width: 100vw;
    z-index: 1;
    color: #ffffff26;
    text-shadow: 0 0 50px rgba(0, 0, 0, 0.07);
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    font-family: "Montserrat", monospace;
}
</style>

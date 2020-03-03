<template>
  <div id="words">
    <p>英语单词</p>
    <div id="words_content">
      <div>
        <p>Word</p>
        <p>Time</p>
      </div>

      <div v-for="details,word in words">
        <router-link :to="'word/'+word">
          <p :style="clear">{{ word }}</p>
        </router-link>
        <p>{{ details['learn-day'] }}</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      words: null,
      clear: {
        "width": "100%",
        "text-align": "center",
        "font-family": "Georgia, serif",
      }
    }
  },
  mounted(){
    this.axios
      .get('./json/words.json')
      .then(response => (this.words = response.data))
      .catch(function(e){
        console.log(e);
      })
  }


}
</script>

<style scoped>
#words > p {
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  color: black;
  margin-bottom: 1em;
  font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
}
#words_content > div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2%;
}
#words_content > div p {
  width: 35%;
  text-align: center;
  font-family: Georgia, serif;
}
#words_content > div:nth-child(1) p {
  color: blue;
  font-size: 1.2em;
}
a {
  width: 35%;
  text-align: center;
  text-decoration: none;
  color: rgb(29, 165, 29);
  transition: all .3s;
}
a:hover {
  color: red;
}


</style>
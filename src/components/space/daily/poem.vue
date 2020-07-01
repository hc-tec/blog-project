<template>
  <div class="daily-poem">
    <p><i class="fa fa-mortar-board"></i> 每日一诗</p>
    <p class="poem">{{ poem }}</p>
  </div>
</template>

<script>
import { ajaxGet } from '../../../elem_compo_encap'
import { POEM } from '../../../api'
import { genericError } from '../../../func'
export default {
  data() {
    return {
      poem: ''
    }
  },
  methods: {
    getPoem() {
      const request = () => {
        ajaxGet(
          POEM, {
            client: 'browser-sdk/1.2',
            'X-User-Token': 'S73ery3QXhFMdPPZKA3pOjqb3iQ9mqye'
          }, response, genericError
        )
      }
      const response = (res) => {
        if(res.data.status === 'success')
          this.poem = res.data.data.content;
      }
      request()
    }
  },
  mounted() {
    this.getPoem()
  }
}
</script>

<style>
.daily-poem .fa {
  color: var(--second-color) !important;
}
.daily-poem > * {
  margin-bottom: 10px;
}
.poem {
  font-size: 1em;
  color: gray;
  word-break: keep-all;
  position: relative;
}
.poem::before {
  content: '“';
  position: absolute;
  left: -20px;
  top: -10px;
  color: RGBA(64, 184, 250, .5);
  font-size: 3em;
  line-height: 1;
  font-weight: 700;
}
.poem::after {
  content: '”';
  position: absolute;
  right: 0px;
  bottom: -20px;
  color: RGBA(64, 184, 250, .5);
  font-size: 2em;
  line-height: 1;
  font-weight: 700;
}
</style>

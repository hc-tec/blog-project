<template>
  <div class="user-space-creative-collection">
    <p><i class="fa fa-cubes"></i> 下面是你创作的作品集，ヾ(๑╹◡╹)ﾉ"</p>
    <div class="creative-collection">
      <briefDetails
        v-for="creative in creatives"
        :key="creative.title"
        :article="creative" />
    </div>
  </div>
</template>

<script>
import briefDetails from '../article-brief-details'
import { ajaxGet } from '../../elem_compo_encap'
import { CREATIVE_COLLECTION } from '../../api'
import { genericError } from '../../func'
export default {
  components: {
    briefDetails
  },
  data () {
    return {
      creatives: []
    }
  },
  methods: {
    getCreativeCollection () {
      const request = () => {
        ajaxGet(
          CREATIVE_COLLECTION(this.getUserInfo.uid), {},
          response, genericError
        )
      }
      const response = (res) => {
        this.creatives = res.data
      }
      request()
    }
  },
  mounted () {
    this.getCreativeCollection()
  }
}
</script>

<style>
.user-space-creative-collection {
  max-height: 500px;
  overflow: auto;
}
.user-space-creative-collection > * {
  margin-bottom: 15px;
}
.creative-collection > section {
  flex-direction: row-reverse;
}
.creative-collection .create-time {
  display: none;
}
</style>

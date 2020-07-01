<template>
  <div class="rank">
    <p>
      <i class="fa fa-bar-chart-o"></i> 创作榜单
    </p>
    <div>
      <rankList
        v-for="(list,index) in rankList_"
        :key="list.user_name"
        :index="index"
        :list="list" />
    </div>
  </div>
</template>

<script>
import { ajaxGet } from '../../elem_compo_encap'
import { RANK } from '../../api'
import { genericError } from '../../func'
import rankList from './ranklist'
export default {
  components: {
    rankList
  },
  data(){
    return {
      rankList_: [],
    }
  },
  methods: {
    getRankList() {
      const request = () => {
        ajaxGet(
          RANK, {},
          response, genericError
        )
      }
      const response = (res) => {
        this.rankList_ = res.data.data;
      }
      request()
    }
  },
  mounted() {
    this.getRankList()
  }
}
</script>

<style>
.rank > div {
  margin-left: 30px;
}
.rank > * {
  margin-bottom: 10px;
}
</style>

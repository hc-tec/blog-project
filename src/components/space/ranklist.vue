<template>
  <section
    class="ranklist">
    <div :style="{
          'color': rankListColor[index]
        }">
      <span class="rankNum">{{ index+1 }}</span>
      <i
        :class="rankModel[index]">
      </i>
    </div>
    <span>{{ list.user_name }}</span>
    <span class="user-space-creatives-num">{{ list.len }}</span>
  </section>
</template>

<script>
export default {
  props: {
    list: Object,
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      rankListColor: [
          'gold', 'var(--success-color)',
          'var(--second-color)', '#d767e4', 'var(--info-color)'
      ],
      rankModel: [
          'el-icon-trophy-1', 'el-icon-trophy',
          'el-icon-trophy', 'el-icon-medal', 'el-icon-medal'
      ]
    }
  }
}
</script>

<style>
.ranklist div {
  text-align: center;
  border-radius: 2px;
  position: relative;
}
.ranklist div .rankNum {
  color: inherit;
  position: absolute;
  font-size: .7em;
  right: -5px;
  bottom: -5px;
}
.ranklist {
  display: flex;
  font-family: "";
  align-items: center;
  justify-content: space-between;
}
.ranklist > * {
  margin-right: 20px;
}
.ranklist span {
  color: var(--second-color);
}
.rank-question {
  float: right;
}
</style>

<template>
  <div id="to-top" @click="toTop">
    <inline-svg :src="arrow"></inline-svg>
  </div>
</template>

<script>
import arrow from '../assets/to-top.svg'

export default {
  name: 'ToTop',
  data() {
    return {
      arrow
    }
  },
  methods: {
    toTop() {
      this.$scrollTo('#app')
    }
  }
}
</script>

<style lang="stylus" scoped>
#to-top
  position fixed
  right 1em
  bottom 1em
  width 2em
  height 2em

  svg
    fill rgba(0, 0, 0, 0.25)
</style>
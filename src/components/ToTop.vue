<template>
  <div id="to-top" v-tooltip="'Back to Top'" @click="toTop">
    <unicon name="top-arrow-to-top" fill="#fff" width="32" height="32" />
  </div>
</template>

<script>
import arrow from '../assets/icons/to-top.svg'

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
  display block
  padding 0.5em
  width 3.2em
  height 3.2em
  border-radius 15%
  background-color rgba(0, 0, 0, 0.25)
  cursor pointer
</style>

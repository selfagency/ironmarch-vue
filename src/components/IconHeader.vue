<template>
  <h2>
    <div class="icon"><unicon :name="icon" :fill="color" height="24" width="24"></unicon></div>
    <span>{{ text | quotes }}</span>
  </h2>
</template>

<script>
export default {
  name: 'IconHeader',
  props: {
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#000',
      required: false
    }
  }
}
</script>

<style lang="stylus" scoped>
h2
  .icon
    float left
    margin 0.125em 0.2em 0 0
</style>

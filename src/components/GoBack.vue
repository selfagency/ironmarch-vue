<template>
  <div class="go-back" @click="$router.go(-1)">&laquo; Back</div>
</template>

<script>
export default {
  name: 'GoBack'
}
</script>

<style lang="stylus" scoped>
.go-back
  color rgb(52, 116, 217)
  font-weight bold
  cursor pointer
</style>

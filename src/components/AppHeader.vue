<template>
  <header>
    <router-link :to="{ name: 'home' }">
      <h1>Iron March DB Dump</h1>
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style lang="stylus" scoped>
header
  display flex
  justify-content center
  align-items center
  font-weight bold
</style>

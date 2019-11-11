<template>
  <header>
    <nav>
      <router-link class="brand" :to="{ name: 'home' }">
        <img src="../assets/ironmarch.jpg" class="logo" alt="Iron March logo" />
        <span>Iron March Forum Leak</span>
      </router-link>

      <search-bar></search-bar>
    </nav>
  </header>
</template>

<script>
import SearchBar from '../components/SearchBar.vue'

export default {
  name: 'AppHeader',
  components: {
    SearchBar
  }
}
</script>

<style lang="stylus" scoped>
nav
  z-index 200
  min-width 375px
</style>

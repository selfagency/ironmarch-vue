<template>
  <header>
    <nav>
      <router-link class="brand" :to="{ name: 'home' }">
        <div class="logo"><inline-svg :src="logo"></inline-svg></div>
        <h1>Iron March Exposed</h1>
      </router-link>

      <search-bar></search-bar>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'

import SearchBar from '../components/SearchBar.vue'

export default {
  name: 'AppHeader',
  components: {
    SearchBar
  },
  computed: {
    ...mapState(['logo'])
  }
}
</script>

<style lang="stylus" scoped>
nav
  z-index 200
  min-width 375px

  h1
    font-size 1.4em

  .brand
    display flex
    flex-direction row
    justify-content center
    align-items center
    max-width 65%

  .logo
    min-width 40px
    max-width 40px
</style>

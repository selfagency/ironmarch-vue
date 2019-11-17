<template>
  <header>
    <nav>
      <router-link class="brand" :to="{ name: 'home' }">
        <div class="logo"><inline-svg :src="logo"></inline-svg></div>
        <div>Iron March Exposed</div>
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

  .brand
    display flex
    flex-direction row
    justify-content center
    align-items center

  .logo
    width 40px
</style>

<template>
  <header>
    <nav>
      <router-link class="brand" :to="{ name: 'home' }">
        <img :src="logo" class="logo" alt="Iron March logo" />
        <span>Iron March Forum Leak</span>
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
</style>

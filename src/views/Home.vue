<template>
  <main id="home">
    <search-bar></search-bar>
    <results></results>
  </main>
</template>

<script>
import SearchBar from '../components/SearchBar.vue'
import Results from '../components/Results.vue'

export default {
  name: 'Home',
  components: {
    SearchBar,
    Results
  }
}
</script>

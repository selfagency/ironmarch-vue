<template>
  <section v-if="!modal" id="search-card">
    <form>
      <search-form @search="search"></search-form>
    </form>
    <div class="card">
      <h3>Use the form above to search:</h3>
      <ul>
        <li>Full-text of posts, messages, and user bios</li>
        <li>User names and email addresses</li>
        <li>Locations</li>
      </ul>
    </div>
  </section>
</template>

<script>
import SearchForm from '../components/SearchForm.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SearchCard',
  components: {
    SearchForm
  },
  computed: {
    ...mapState('search', ['modal'])
  },
  methods: {
    ...mapActions('search', ['search'])
  }
}
</script>

<style lang="stylus" scoped>
#search-card
  width 100%

  form
    margin 0
    padding 0
    width 100%

  .card
    padding 1em 3em
    background-color rgb(250, 250, 250)
    text-align center

    @media screen and (min-width: 800px)
      padding 2em 4em

    ul
      margin 0.5em auto
      padding 0
      max-width 300px
      width 100%
      text-align left
</style>

<template>
  <form class="container">
    <fieldset>
      <div class="row">
        <div class="column column-75">
          <input v-model="terms" type="text" class="search-box" aria-label="Search box" />
        </div>
        <div class="column column-25">
          <button id="search-button" type="submit" @click="search">
            Search
          </button>
        </div>
      </div>

      <div class="row">
        <div v-for="(search, key) in searches" :key="key" class="column column-25" role="none">
          <input
            :id="`search-${search}`"
            type="radio"
            name="method"
            :value="search"
            :aria-label="search"
            @input="method(search)"
          />
          <label class="label-inline" :for="`search-${search}`">{{ search | capitalize }}</label>
        </div>
      </div>
    </fieldset>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SearchBar',
  data() {
    return {
      searches: ['posts', 'messages', 'users']
    }
  },
  computed: {
    ...mapState('search/method', ['messages', 'posts', 'users']),
    terms: {
      get() {
        return this.$store.state.search.params.terms
      },
      set(t) {
        this.$store.dispatch('search/terms', t)
      }
    }
  },
  mounted() {
    const posts = document.getElementById('search-posts')
    posts.setAttribute('checked', true)
  },
  methods: {
    ...mapActions('search', ['method', 'search'])
  }
}
</script>

<style lang="stylus" scoped>
#search-button
  width 100%
</style>

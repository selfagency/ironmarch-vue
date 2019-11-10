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
            v-model="selected"
            type="radio"
            name="method"
            :value="search"
            :aria-label="search"
            @input="setMethod(search)"
          />
          <label class="label-inline" :for="`search-${search}`">{{ search | capitalize }}</label>

          <div v-if="search === 'users' && method === 'user'" class="doxbox">
            <input
              id="dox"
              v-model="dox"
              type="checkbox"
              name="dox"
              aria-label="Show doxed users only"
              @click="setDox"
            />
            <label class="label-inline" for="dox">IDed only</label>
          </div>
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
      searches: ['posts', 'messages', 'users'],
      selected: null,
      dox: null
    }
  },
  computed: {
    ...mapState('search', ['method', 'params']),
    terms: {
      get() {
        return this.params.terms
      },
      set(t) {
        this.$store.dispatch('search/setTerms', t)
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.selected = 'posts'
    })
  },
  methods: {
    ...mapActions('search', ['setMethod', 'setDox', 'search', 'deleteResults'])
  }
}
</script>

<style lang="stylus" scoped>
#search-button
  width 100%

.doxbox
  float right
</style>

<template>
  <div id="search">
    <form :class="{ modal: active, 'none full-600': !active }">
      <fieldset>
        <div id="search-bar" class="flex two">
          <div class="three-fourth">
            <input id="search-box" v-model="terms" type="text" :placeholder="placeholder" aria-label="Search box" />
          </div>
          <div class="fourth">
            <button id="search-button" type="submit" @click="search">
              Search
            </button>
          </div>
        </div>
      </fieldset>
    </form>
    <div id="search-toggle" class="none-600" @click="activeToggle">
      <inline-svg :src="icon" width="25" height="25"></inline-svg>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import search from '../assets/search.svg'
import close from '../assets/close.svg'

export default {
  name: 'SearchBar',
  data() {
    return {
      searches: ['users', 'messages', 'posts'],
      placeholder: 'Search text, emails, and locations'
    }
  },
  computed: {
    ...mapState('search', ['params', 'active']),
    icon() {
      return this.active ? close : search
    },
    terms: {
      get() {
        return this.params.terms
      },
      set(t) {
        this.$store.dispatch('search/setTerms', t)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.selected = this.method ? `${this.method}s` : 'users'
    })
  },
  methods: {
    ...mapActions('search', ['search', 'deleteResults', 'activeToggle'])
  }
}
</script>

<style lang="stylus" scoped>
#search
  .modal
    position fixed
    top 3em
    left 0
    z-index 100
    display flex
    justify-content center
    align-items center
    width 100vw
    height calc(100vh - 3em)
    background-color #ccc

  #search-bar
    align-items center
    margin-top 0.1em
    width 100%

  #search-toggle
    float right
    padding 0.6em

    .svg-icon
      width 1.5em
      height 1.5em

  #search-button
    min-width 90px
    width 100%
</style>

<template>
  <div id="search">
    <form :class="{ modal, 'none full-600': !modal }">
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
    <div id="search-toggle" class="none-600" @click="toggleModal">
      <transition-group name="zoom" mode="out-in">
        <inline-svg v-if="modal" :src="close" width="25" height="25" key="close"></inline-svg>
        <inline-svg v-else :src="open" width="25" height="25" key="open"></inline-svg>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import open from '../assets/search.svg'
import close from '../assets/close.svg'

export default {
  name: 'SearchBar',
  data() {
    return {
      searches: ['users', 'messages', 'posts'],
      placeholder: 'Search text, emails, and locations',
      open,
      close
    }
  },
  computed: {
    ...mapState('search', ['params', 'modal']),
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
    this.$store.subscribeAction(action => {
      if (action.type === 'search/search' && this.$route.name !== 'search') this.$router.push({ name: 'search' })
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.selected = this.method ? `${this.method}s` : 'users'
    })
  },
  methods: {
    ...mapActions('search', ['search', 'deleteResults', 'toggleModal'])
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

    fieldset
      width 85%

  #search-bar
    align-items center
    margin-top 0.1em
    width 100%

  #search-toggle svg
    position absolute
    top 0.6em
    right 0.6em
    width 25px
    height 25px
    cursor pointer

  #search-button
    min-width 90px
    width 100%
</style>

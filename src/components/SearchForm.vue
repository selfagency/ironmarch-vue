<template>
  <fieldset>
    <div id="search-bar" class="flex two">
      <div class="three-fourth">
        <input
          id="search-box"
          v-model="terms"
          v-focus="focused"
          type="text"
          :placeholder="placeholder"
          aria-label="Search box"
          @focus="toggleFocus(true)"
          @blur="toggleFocus(false)"
        />
      </div>
      <div class="fourth">
        <button id="search-button" type="submit" @click="search">
          Search
        </button>
      </div>
    </div>
  </fieldset>
</template>

<script>
import { focus } from 'vue-focus'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SearchForm',
  directives: { focus },
  props: {
    placeholder: {
      type: String,
      default: 'Search'
    }
  },
  computed: {
    ...mapState('search', ['params', 'focused']),
    terms: {
      get() {
        return this.params.terms
      },
      set(t) {
        this.setTerms(t)
      }
    }
  },
  created() {
    if (!this.focused) this.toggleFocus(true)
  },
  methods: {
    ...mapActions('search', ['setTerms', 'toggleFocus']),
    search(e) {
      e.preventDefault()
      this.$emit('search')
    }
  }
}
</script>

<style lang="stylus" scoped>
#search-bar
  align-items center
  margin-top 0.1em
  width 100%

  #search-button
    min-width 90px
    width 100%
</style>

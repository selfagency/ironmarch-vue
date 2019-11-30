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
        <button id="search-button" type="submit" @click.prevent="$emit('search')">
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
    ...mapActions('search', ['setTerms', 'toggleFocus'])
  }
}
</script>

<style lang="stylus" scoped>
fieldset
  margin-inline-start 0

#search-bar
  align-items center
  width 100%

  &.flex
    margin 0

    .three-fourth
      padding-left 0

  input
    font-size 16px

  #search-button
    min-width 70px
    width 100%
    font-size 16px
</style>

<template>
  <div id="search">
    <transition-group name="fade">
      <form v-if="modal" id="search-form" key="modal" class="modal">
        <search-form :placeholder="placeholder" @search="search"></search-form>
      </form>
      <form v-else id="search-form" key="bar" class="none full-600">
        <search-form
          v-if="$route.path !== '/' && !($route.path === '/search' && !active)"
          :placeholder="placeholder"
          @search="search"
        ></search-form>
      </form>
    </transition-group>
    <div id="search-toggle" class="none-600" @click="searchToggle">
      <transition-group name="zoom" mode="out-in">
        <div v-show="modal" key="close">
          <unicon name="multiply" fill="#0074d9" width="25" height="25" />
        </div>

        <div v-show="!modal" key="open">
          <unicon name="search-alt" fill="#0074d9" width="25" height="25" />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchForm from './SearchForm.vue'
import open from '../assets/icons/search.svg'
import close from '../assets/icons/close.svg'

export default {
  name: 'SearchBar',
  directives: { focus },
  components: {
    SearchForm
  },
  data() {
    return {
      searches: ['users', 'messages', 'posts'],
      placeholder: 'Search text, emails, and locations',
      open,
      close
    }
  },
  computed: {
    ...mapState('search', ['modal', 'active'])
  },
  created() {
    this.$store.subscribeAction(action => {
      if (action.type === 'search/search' && this.$route.name !== 'search')
        this.$router.push({ name: 'search' })
    })
  },
  methods: {
    ...mapActions('search', ['search', 'deleteResults', 'toggleModal', 'toggleFocus']),
    searchToggle() {
      this.toggleModal()
    }
  }
}
</script>

<style lang="stylus" scoped>
#search
  width 100%

  .modal
    position fixed
    top 3em
    left 0
    z-index 100
    display flex
    justify-content center
    align-items flex-start
    padding-top 4em
    width 100vw
    height calc(100vh - 3em)
    background-color #ccc

    fieldset
      width 85%

  #search-toggle div
    position absolute
    top 0.6em
    right 0.6em
    width 25px
    height 25px
    cursor pointer
</style>

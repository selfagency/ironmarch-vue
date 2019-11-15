<template>
  <div id="app">
    <app-header></app-header>
    <transition name="fade">
      <router-view />
    </transition>
    <app-footer></app-footer>
    <div v-if="loading" id="loading">
      <loader :color="`rgb(52, 116, 217)`"></loader>
    </div>
    <to-top></to-top>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import ToTop from './components/ToTop.vue'

export default {
  name: 'App',
  metaInfo() {
    return {
      titleTemplate: '%s · Iron March Forum Leak',
      link: [{ rel: 'canonical', href: `https://iron-march-web.now.sh${this.$route.path}` }]
    }
  },
  components: {
    AppHeader,
    AppFooter,
    ToTop
  },
  computed: {
    ...mapState(['loading'])
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        this.$utils.footerOffset()
      })
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'ERROR') {
        if (this.loading) this.$store.dispatch('loading')
        this.$toasted.show(state.error, { type: 'error' })
        setTimeout(() => {
          this.$store.dispatch('errorReset')
        }, 5000)
      }
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.$utils.footerOffset()
    })
  }
}
</script>

<style lang="stylus">
@import '../node_modules/picnic/picnic.min.css'
@import '../node_modules/vue2-animate/dist/vue2-animate.css'
@import './assets/css/tooltip.css'

#app
  position relative
  margin 0 auto
  padding 2em
  width 100%
  font-size 0.85em
  font-family Avenir, Arial, Helvetica, sans-serif

main
  display flex
  flex-direction column
  justify-content center
  align-items center
  margin 3em auto 230px
  min-height 75vh
  max-width 760px
  width 100%

  .card
    width 100%

img
  max-width 100%

.read-more
  float right

#loading
  position fixed
  top 0
  left 0
  z-index 100
  display flex
  justify-content center
  align-items center
  width 100vw
  height 100vh
  pointer-events none

p
  margin-block-start 0
</style>

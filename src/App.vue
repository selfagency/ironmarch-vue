<template>
  <div id="app">
    <app-header></app-header>
    <div v-if="loading" id="loading">
      <loader :color="`rgb(52, 116, 217)`"></loader>
    </div>
    <transition>
      <router-view />
    </transition>
    <app-footer></app-footer>
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
  components: {
    AppHeader,
    AppFooter,
    ToTop
  },
  computed: {
    ...mapState(['loading'])
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
  }
}
</script>

<style lang="stylus">
@import '../node_modules/picnic/picnic.min.css'
@import '../node_modules/vue2-animate/dist/vue2-animate.min.css'

#app
  position relative
  margin 0 auto
  padding 2em
  max-width 1160px
  width 100%
  font-size 0.9em
  font-family Avenir, Arial, Helvetica, sans-serif

main
  margin 3em auto 0
  min-height 60vh
  max-width 760px

img
  max-width 100%

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

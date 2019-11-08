<template>
  <div id="app">
    <app-header></app-header>
    <div v-if="error" id="error">
      {{ error }}
    </div>
    <div v-if="loading" id="loading">
      <loader :color="`#9b4dca`"></loader>
    </div>
    <router-view />
    <app-footer></app-footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    ...mapState(['loading', 'error'])
  }
}
</script>

<style lang="stylus">
@import '../node_modules/milligram/dist/milligram.css'
@import '../node_modules/vue2-animate/dist/vue2-animate.min.css'

#app
  margin 0 auto
  padding 2em
  max-width 1160px
  font-family Avenir, Arial, Helvetica, sans-serif

#loading, #error
  position fixed
  top 0
  left 0
  z-index 100
  display flex
  justify-content center
  align-items center
  width 100vw
  height 100vh
</style>

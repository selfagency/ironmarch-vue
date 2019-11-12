<template>
  <main id="message">
    <go-back></go-back>
    <messages :msgs="current.thread" :trunc="false" :thread="current.title"></messages>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Messages from '../components/Messages.vue'

export default {
  name: 'Msg',
  components: {
    Messages
  },
  computed: {
    ...mapState('content', ['current'])
  },
  watch: {
    $route(to) {
      if (to.name === 'message') {
        this.get()
      }
    }
  },
  created() {
    this.get()
  },
  methods: {
    ...mapActions('content', ['getPage']),
    ...mapActions(['loading']),
    get() {
      this.loading()
      this.getPage({ method: 'message', params: { id: this.$route.params.id } })
      this.loading()
    }
  }
}
</script>

<style lang="stylus" scoped>
article
  margin 2em 0
  padding 0
</style>

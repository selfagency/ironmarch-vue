<template>
  <main v-if="msg" id="message">
    <div class="meta">
      <h1 v-if="msg.thread && msg.thread.content" class="title">{{ msg.thread.content }}</h1>
    </div>
    <!-- <article class="container" v-html="msg.content"></article> -->
    <messages :msgs="msg.thread" :trunc="false"></messages>
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
    ...mapState('content', ['current']),
    msg() {
      return this.current
    }
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
main
  margin 0 auto
  padding 2em
  max-width 960px

article
  margin 2em 0
  padding 0
</style>

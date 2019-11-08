<template>
  <main v-if="msg">
    <div class="meta">
      <h1 v-if="msg.thread && msg.thread.content" class="title">{{ msg.thread.content }}</h1>
      <div v-if="msg.author">
        <strong>From</strong>
        <router-link :to="{ name: 'user', params: { id: msg.authorId } }">
          {{ msg.author.name }}
        </router-link>
      </div>
      <div v-if="msg.thread && msg.thread.recipient">
        <strong>To</strong>
        <router-link :to="{ name: 'user', params: { id: msg.thread.recipientId } }">
          {{ msg.thread.recipient.name }}
        </router-link>
      </div>
      <div v-if="msg.date">
        <small>{{ msg.date | dateConv }}</small>
      </div>
    </div>
    <article class="container" v-html="msg.content"></article>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Msg',
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
      this.$scrollTo('#app')
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
  max-width 760px

article
  margin 2em 0
  padding 0
</style>

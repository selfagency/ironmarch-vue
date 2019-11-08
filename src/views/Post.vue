<template>
  <main id="post" v-if="post">
    <div class="meta">
      <div v-if="post.author">
        <router-link :to="{ name: 'user', params: { id: post.author.id } }">
          {{ post.author.name }}
        </router-link>
      </div>
      <div v-if="post.date">
        <small>{{ post.date | dateConv }}</small>
      </div>
    </div>
    <article class="container" v-html="post.content"></article>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Post',
  computed: {
    ...mapState('content', ['current']),
    post() {
      return this.current
    }
  },
  watch: {
    $route(to) {
      if (to.name === 'post') {
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
      this.getPage({ method: 'post', params: { id: this.$route.params.id } })
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

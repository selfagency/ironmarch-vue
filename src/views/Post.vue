<template>
  <main v-if="current" id="post">
    <go-back></go-back>
    <article class="card">
      <div class="meta">
        <div v-if="current.author">
          <router-link :to="{ name: 'user', params: { id: current.author.id } }">
            <strong>{{ current.author.name }}</strong>
          </router-link>
        </div>
        <div v-if="current.date">
          <small>{{ current.date | dateConv }}</small>
        </div>
      </div>
      <div class="content" v-html="current.content"></div>
    </article>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Post',
  metaInfo() {
    return {
      title: this.$options.filters.truncate(this.current.content, 60),
      meta: [
        {
          property: 'title',
          content: this.$options.filters.truncate(this.current.content, 60)
        },
        {
          property: 'description',
          content: this.$options.filters.truncate(this.current.content, 255)
        },
        {
          property: 'og:description',
          content: this.$options.filters.truncate(this.current.content, 255)
        },
        {
          property: 'og:image',
          content: `${this.siteUrl}${this.logo}`
        },
        {
          property: 'og:url',
          content: `${this.siteUrl}${this.$route.path}`
        }
      ]
    }
  },
  computed: {
    ...mapState('content', ['current']),
    ...mapState(['siteUrl', 'logo'])
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
      this.getPage({ method: 'post', params: { id: this.$route.params.id } })
      this.loading()
    }
  }
}
</script>

<style lang="stylus" scoped>
.go-back
  margin-bottom 1em

.card
  padding 2em

.meta
  font-size 1.1em

.content
  margin 2em 0 0
  padding 0
</style>

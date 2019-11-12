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
  metaInfo() {
    return {
      title: this.current.title,
      meta: [
        {
          property: 'title',
          content: this.current.title
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
  components: {
    Messages
  },
  computed: {
    ...mapState('content', ['current']),
    ...mapState(['siteUrl', 'logo'])
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

<template>
  <main id="home">
    <div class="card">
      <strong>Use the form above to search:</strong>
      <ul>
        <li>Full-text of posts, messages, and user bios</li>
        <li>User names and email addresses</li>
        <li>Locations</li>
      </ul>
    </div>

    <div v-if="meta" class="full">
      <locales :locales="meta.locales"></locales>
      <meta-data :meta="meta"></meta-data>
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Locales from '../components/Locales.vue'
import MetaData from '../components/MetaData.vue'

export default {
  name: 'Home',
  metaInfo() {
    return {
      title: 'Home',
      meta: [
        {
          property: 'title',
          content: 'Iron March Forum Leak'
        },
        {
          property: 'description',
          content: 'A searchable index of leaked data from the Iron March neo-Nazi forum'
        },
        {
          property: 'og:description',
          content: 'A searchable index of leaked data from the Iron March neo-Nazi forum'
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
    Locales,
    MetaData
  },
  computed: {
    ...mapState(['siteUrl', 'logo']),
    ...mapState('content', ['meta'])
  },
  created() {
    this.getMeta()
  },
  methods: {
    ...mapActions('content', ['getMeta'])
  }
}
</script>

<style lang="stylus" scoped>
.card
  padding 2em 4em
  text-align center

  ul
    margin 0.5em auto
    padding 0
    max-width 320px
    width 100%
    text-align left
</style>

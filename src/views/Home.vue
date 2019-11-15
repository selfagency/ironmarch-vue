<template>
  <main id="home">
    <div class="card">
      <h3>Use the form above to search:</h3>
      <ul>
        <li>Full-text of posts, messages, and user bios</li>
        <li>User names and email addresses</li>
        <li>Locations</li>
      </ul>
    </div>

    <div v-if="meta" class="full">
      <locales v-if="meta.locales" :locales="meta.locales"></locales>
      <!-- <users v-if="current.data && current.data.length" :users="current"></users> -->
      <meta-data :meta="meta"></meta-data>
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Locales from '../components/Locales.vue'
import MetaData from '../components/MetaData.vue'
// import Users from '../components/Users.vue'

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
    // Users
  },
  computed: {
    ...mapState(['siteUrl', 'logo']),
    ...mapState('content', ['meta', 'current'])
  },
  created() {
    this.getPage({ method: 'meta', params: { data: 'all' } })
    // this.getUser({ params: { identity: true } })
  },
  methods: {
    ...mapActions('content', ['getPage'])
    // ...mapActions('user', ['getUser'])
  }
}
</script>

<style lang="stylus" scoped>
.card
  background-color rgb(250, 250, 250)
  padding 2em 4em
  text-align center

  ul
    margin 0.5em auto
    padding 0
    max-width 300px
    width 100%
    text-align left
</style>

<template>
  <main id="home">
    <div class="header">
      <h1>Iron March Exposed</h1>
      <div class="icon"><inline-svg :src="logo"></inline-svg></div>
    </div>
    <search-card></search-card>
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
import SearchCard from '../components/SearchCard.vue'
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
    MetaData,
    SearchCard
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
.header
  display flex
  flex-direction column
  justify-content center
  align-items center
  padding 3em 0
  width 100%

  h1
    text-align center

  .icon
    padding 2em
    max-width 300px
    width 100%

    svg
      width 100%
</style>

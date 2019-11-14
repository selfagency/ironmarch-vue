<template>
  <main id="results">
    <transition-group name="fade" mode="out-in" tag="div">
      <div v-if="hasResults" key="results">
        <div class="meta flex">
          <div class="full half-500">
            <h1 v-if="active">{{ active !== 'null' ? `Results for '${active}'` : 'Browsing all data' | quotes }}</h1>
          </div>
          <div v-if="hasResults" id="search-nav" class="full half-500">
            #
            <ul>
              <li v-if="results.users.data.length" role="link" @click="$scrollTo('#users')">Users</li>
              <li v-if="results.messages.data.length" role="link" @click="$scrollTo('#messages')">Messages</li>
              <li v-if="results.posts.data.length" role="link" @click="$scrollTo('#posts')">Posts</li>
            </ul>
          </div>
        </div>

        <users v-if="results.users.data.length" :users="results.users"></users>
        <messages v-if="results.messages.data.length" :msgs="results.messages.data" :search="true" :is-more="results.messages.isMore"></messages>
        <posts v-if="results.posts.data.length" :posts="results.posts" :search="true"></posts>
      </div>

      <div v-if="!loading && active && noResults" key="no-results" class="card" role="status">
        <p>No results to display.</p>
      </div>

      <div v-if="!loading && !active && noResults" key="pre-search" class="card">
        <strong>Use the form above to search:</strong>
        <ul>
          <li>Full-text of posts, messages, and user bios</li>
          <li>User names and email addresses</li>
          <li>Locations</li>
        </ul>
      </div>
    </transition-group>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Posts from '../components/Posts.vue'
import Messages from '../components/Messages.vue'
import Users from '../components/Users.vue'

export default {
  name: 'Search',
  metaInfo() {
    return {
      title: this.params.terms ? `Search for '${this.params.terms}'` : 'Search',
      meta: [
        {
          property: 'title',
          content: `Search for '${this.params.terms}'`
        },
        {
          property: 'description',
          content: `Iron March Forum Leak search for '${this.params.terms}'`
        },
        {
          property: 'og:description',
          content: `Iron March Forum Leak search for '${this.params.terms}'`
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
    Posts,
    Messages,
    Users
  },
  computed: {
    ...mapState('search', ['results', 'active', 'params']),
    ...mapState(['siteUrl', 'logo', 'loading']),
    hasResults() {
      return this.results.posts.data.length || this.results.messages.data.length || this.results.users.data.length
    },
    noResults() {
      return !this.results.posts.data.length && !this.results.messages.data.length && !this.results.users.data.length
    }
  },
  created() {
    if (!this.params.terms && this.$route.query.q) {
      this.setTerms(this.$route.query.q)
      this.search()
    }
  },
  methods: {
    ...mapActions('search', ['more', 'setTerms', 'search'])
  }
}
</script>

<style lang="stylus" scoped>
#results
  > div
    width 100%

  h1
    padding 0

  .meta > div
    padding 0

  .flex
    flex-direction row
    margin 0
    width 100%

  .card
    padding 2em 4em
    width 100%
    text-align center

    ul
      margin 0.5em auto
      padding 0
      max-width 320px
      width 100%
      text-align left

  .mgl-map-wrapper
    margin-bottom 4em

#search-nav
  display flex
  justify-content flex-end
  align-items center

  ul
    margin 0
    padding 0
    list-style-type none

    li
      display inline-block
      padding 0 0 0 1em
      font-weight bold
      cursor pointer
</style>

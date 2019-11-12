<template>
  <main id="results">
    <div class="flex">
      <div class="full half-500">
        <h1 v-if="active">{{ active !== 'null' ? `Results for '${active}'` : 'Browsing all data' }}</h1>
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

    <div v-if="hasResults">
      <users v-if="results.users.data.length" :users="results.users" :search="true"></users>
      <messages v-if="results.messages.data.length" :msgs="results.messages.data" :search="true"></messages>
      <posts v-if="results.posts.data.length" :posts="results.posts" :search="true"></posts>
    </div>

    <div v-if="active && noResults" class="status" role="status">
      <p>No results to display.</p>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Posts from '../components/Posts.vue'
import Messages from '../components/Messages.vue'
import Users from '../components/Users.vue'

export default {
  name: 'Search',
  components: {
    Posts,
    Messages,
    Users
  },
  computed: {
    ...mapState('search', ['results', 'active']),
    hasResults() {
      return this.results.posts.data.length || this.results.messages.data.length || this.results.users.data.length
    },
    noResults() {
      return !(this.results.posts.data.length && this.results.messages.data.length && this.results.users.data.length)
    }
  },
  methods: {
    ...mapActions('search', ['more'])
  }
}
</script>

<style lang="stylus" scoped>
#results
  .status
    display flex
    justify-content center
    align-items center

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

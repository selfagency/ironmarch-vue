<template>
  <main id="results">
    <h1 v-if="params.terms">Results for '{{ params.terms }}'</h1>
    <users v-if="results.users.data.length" :users="results.users" :search="true"></users>
    <messages v-if="results.messages.data.length" :msgs="results.messages" :search="true"></messages>
    <posts v-if="results.posts.data.length" :posts="results.posts" :search="true"></posts>

    <div v-if="noResults" class="status" role="status">
      <p>No results to display.</p>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Posts from './Posts.vue'
import Messages from './Messages.vue'
import Users from './Users.vue'

export default {
  name: 'Results',
  components: {
    Posts,
    Messages,
    Users
  },

  computed: {
    ...mapState('search', ['results', 'params']),
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
  margin-top 2em

.status
  display flex
  justify-content center
  align-items center

.mgl-map-wrapper
  margin-bottom 4em
</style>

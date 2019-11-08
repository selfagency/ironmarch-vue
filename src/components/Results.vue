<template>
  <main id="results">
    <posts v-if="method === 'post'" :posts="results" :search="true"></posts>
    <messages v-if="method === 'message'" :msgs="results" :search="true"></messages>
    <users v-if="method === 'user'" :users="results"></users>

    <div v-if="!results.length" class="status" role="status">
      <p>No results to display.</p>
    </div>

    <div v-if="results.length >= params.limit" class="more" role="none">
      <button @click="more">
        More results
      </button>
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
    ...mapState('search', ['method', 'results', 'params'])
  },
  methods: {
    ...mapActions('search', ['more'])
  }
}
</script>

<style lang="stylus" scoped>
#results
  margin-top 2em
  padding 2em

.status
  display flex
  justify-content center
  align-items center

.more
  display flex
  justify-content center
  align-items center
</style>

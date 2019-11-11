<template>
  <main v-if="results" id="results">
    <posts v-if="method === 'post'" :posts="results" :search="true"></posts>
    <messages v-if="method === 'message'" :msgs="results" :search="true"></messages>

    <div v-if="method === 'user' && results.length">
      <map-box :users="results"></map-box>
      <users :users="results" :search="true"></users>
    </div>

    <div v-if="!results.length" class="status" role="status">
      <p>No results to display.</p>
    </div>

    <div v-if="results.length && isMore" class="more" role="none">
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
import MapBox from './Map.vue'

export default {
  name: 'Results',
  components: {
    Posts,
    Messages,
    Users,
    MapBox
  },

  computed: {
    ...mapState('search', ['method', 'results', 'params', 'isMore'])
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

.mgl-map-wrapper
  margin-bottom 4em
</style>

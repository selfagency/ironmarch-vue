<template>
  <main>
    <div v-if="profile" class="container">
      <h1>{{ profile.name }}</h1>
      <profile :user="profile"></profile>
      <div class="user-nav">
        <ul>
          <li v-if="statuses.length" role="link" @click="$scrollTo('#statuses')">Statuses</li>
          <li v-if="posts.length" role="link" @click="$scrollTo('#posts')">Posts</li>
          <li v-if="msgs.length" role="link" @click="$scrollTo('#messages')">Messages</li>
        </ul>
      </div>
      <statuses :statuses="statuses"></statuses>
      <posts :posts="posts"></posts>
      <messages :msgs="msgs"></messages>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Messages from '../components/Messages.vue'
import Posts from '../components/Posts.vue'
import Profile from '../components/Profile.vue'
import Statuses from '../components/Statuses.vue'

export default {
  name: 'User',
  components: {
    Messages,
    Posts,
    Profile,
    Statuses
  },
  computed: {
    ...mapState('user', ['profile', 'msgs', 'posts', 'statuses', 'offsets'])
  },
  watch: {
    $route(to) {
      if (to.name === 'user') {
        this.get()
      }
    }
  },
  created() {
    this.get()
  },
  methods: {
    ...mapActions('user', ['getUser']),
    ...mapActions(['loading']),
    get() {
      this.loading()
      this.$scrollTo('#app')
      this.getUser({ params: { id: this.$route.params.id } })
      this.loading()
    }
  }
}
</script>

<style lang="stylus" scoped>
.user-nav
  display flex
  justify-content center
  align-items center
  margin 2em auto -4em

  ul
    list-style-type none

    li
      display inline-block
      padding 1em
      font-weight bold
      cursor pointer

#statuses, #posts, #messages
  margin-top 4em
</style>

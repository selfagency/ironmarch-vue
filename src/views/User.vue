<template>
  <main v-if="profile && Object.values(profile).length" id="user">
    <div class="container">
      <div class="notice column">
        <span>NOTICE:</span> Some identifying information below may come from public email and IP address lookups and
        therefore may not be wholly accurate. Unless you are able to verify and corroborate an individual's identity, do
        not assume that a real name match or Twitter profile match, for example, is concrete proof of anything.
      </div>
      <h1>{{ profile.name }}</h1>
      <profile :user="profile"></profile>
      <div class="user-nav">
        <ul>
          <li v-if="hasStatus(statuses.data)" role="link" @click="$scrollTo('#statuses')">Statuses</li>
          <li v-if="posts.data.length" role="link" @click="$scrollTo('#posts')">Posts</li>
          <li v-if="messages.data.length" role="link" @click="$scrollTo('#messages')">Messages</li>
        </ul>
      </div>
      <statuses :statuses="statuses.data"></statuses>
      <posts :posts="posts.data" :is-more="posts.isMore" :user="profile"></posts>
      <messages :msgs="messages.data" :is-more="messages.isMore" :user="profile"></messages>
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
    ...mapState('user', ['profile', 'messages', 'posts', 'statuses'])
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
    hasStatus(s) {
      return s.length && Object.values(s[0]).length
    },
    get() {
      this.loading()
      this.getUser({ params: { id: this.$route.params.id } })
      this.loading()
    }
  }
}
</script>

<style lang="stylus" scoped>
.notice
  margin-bottom 2em
  padding 1em
  background-color #FBE9E9
  color black
  font-size 0.8em

  span
    color red
    font-weight bold

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

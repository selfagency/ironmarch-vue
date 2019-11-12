<template>
  <main v-if="profile && Object.values(profile).length" id="user">
    <header class="notice column">
      <span>NOTICE:</span> Some identifying information below may come from public email and IP address lookups and therefore may not be wholly accurate. Unless
      you are able to verify and corroborate an individual's identity, do not assume that a real name match or Twitter profile match, for example, is concrete
      proof of anything.
    </header>
    <go-back></go-back>
    <div class="flex">
      <h1 class="full half-500">{{ profile.name }}</h1>
      <div id="user-nav" class="full half-500">
        #
        <ul>
          <li v-if="hasStatus(statuses.data)" role="link" @click="$scrollTo('#statuses')">Statuses</li>
          <li v-if="messages.data.length" role="link" @click="$scrollTo('#messages')">Messages</li>
          <li v-if="posts.data.length" role="link" @click="$scrollTo('#posts')">Posts</li>
        </ul>
      </div>
    </div>
    <profile :user="profile"></profile>
    <statuses :statuses="statuses.data"></statuses>
    <messages :msgs="messages.data" :is-more="messages.isMore" :user="profile"></messages>
    <posts :posts="posts" :is-more="posts.isMore" :user="profile"></posts>
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
  metaInfo() {
    return {
      title: this.profile.name,
      meta: [
        {
          property: 'title',
          content: this.profile.name
        },
        {
          property: 'description',
          content: `${this.profile.name}'s user profile on the Iron March neo-Nazi forum`
        },
        {
          property: 'og:description',
          content: `${this.profile.name}'s user profile on the Iron March neo-Nazi forum`
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
    Messages,
    Posts,
    Profile,
    Statuses
  },
  computed: {
    ...mapState('user', ['profile', 'messages', 'posts', 'statuses']),
    ...mapState(['siteUrl', 'logo'])
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

.flex
  align-items center
  margin 0
  width 100%

h1
  padding 0.5em 0

#user-nav
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

#statuses, #posts, #messages
  margin-top 4em
</style>

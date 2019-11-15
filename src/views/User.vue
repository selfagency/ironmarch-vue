<template>
  <main v-if="profile && Object.values(profile).length" id="user">
    <go-back></go-back>
    <div class="flex">
      <h1 class="full half-500">
        <span>{{ profile.name }}</span>
      </h1>
      <div id="user-nav" class="full half-500">
        <span>#</span>
        <ul>
          <li role="link" @click="$scrollTo('#ips')">
            IPs
          </li>
          <li v-if="hasStatus(statuses.data)" role="link" @click="$scrollTo('#statuses')">
            Statuses
          </li>
          <li v-if="messages.data.length" role="link" @click="$scrollTo('#messages')">
            Messages
          </li>
          <li v-if="posts.data.length" role="link" @click="$scrollTo('#posts')">
            Posts
          </li>
          <li v-if="profile.dossier" role="link" @click="$scrollTo('#dossier')">
            Dossier
          </li>
          <li role="link" @click="$scrollTo('#comments')">
            Comments
          </li>
        </ul>
      </div>
    </div>
    <profile :user="profile"></profile>

    <ip-table v-if="profile.ips.length" :ip-data="profile.ips"></ip-table>
    <statuses v-if="statuses.data.length" :statuses="statuses.data"></statuses>
    <messages
      v-if="messages.data.length"
      :msgs="messages.data"
      :is-more="messages.isMore"
      :user="profile"
    >
    </messages>
    <posts v-if="posts.data.length" :posts="posts" :is-more="posts.isMore" :user="profile"> </posts>
    <dossier v-if="profile.dossier" :dossier="profile.dossier" key="dossier"></dossier>
    <comments></comments>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Comments from '../components/Comments.vue'
import Dossier from '../components/Dossier.vue'
import IpTable from '../components/IpTable.vue'
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
    Comments,
    Dossier,
    IpTable,
    Messages,
    Posts,
    Profile,
    Statuses
  },
  data() {
    return {
      showDossier: false
    }
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
    hasStatus(s) {
      return s.length && Object.values(s[0]).length
    },
    get() {
      this.getUser({ params: { id: this.$route.params.id } })
    }
  }
}
</script>

<style lang="stylus" scoped>
.flex
  align-items center
  margin 0
  width 100%

h1
  padding 0.5em 0

  .icon
    float left
    margin 0.1em 0.2em 0 0

.view-select
  margin-top 2em
  font-size 1.1em

  span
    color #0074d9
    cursor pointer

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

  span
    margin-top -0.2em

#statuses, #posts, #messages
  margin-top 4em
</style>

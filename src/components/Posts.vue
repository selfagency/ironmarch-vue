<template>
  <section v-if="Object.values(posts.data[0]).length" id="posts" class="full">
    <h2>Posts</h2>
    <table>
      <tr class="header flex">
        <th class="none third-800">Meta</th>
        <th class="none two-third-800">Content</th>
      </tr>
      <tr v-for="(post, key) in posts.data" v-show="post.content" :key="key" class="flex">
        <td valign="top" class="full third-600">
          <router-link :to="{ name: 'user', params: { id: post.authorId } }">
            <strong v-if="post.author">{{ post.author.name }}</strong>
            <strong v-else>{{ post.authorId }}</strong>
          </router-link>
          <br />
          <small>{{ post.date | dateConv }}</small>
          <br />
          <small><router-link :to="{ name: 'post', params: { id: post.id } }">Link</router-link></small>
        </td>
        <td valign="top" :class="{ wide }" class="full two-third-600">
          <div class="content">
            {{ post.content | truncate(255) }}

            <div class="read-more">
              <router-link :to="{ name: 'post', params: { id: post.id } }">
                More &raquo;
              </router-link>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <div v-if="posts.isMore" class="more" role="none">
      <button @click="search ? more('post') : getMore({ method: 'post', params: { user: user.id } })">
        More posts
      </button>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Posts',
  props: {
    user: {
      type: Object,
      default() {
        return {}
      }
    },
    search: {
      type: Boolean,
      default: false
    },
    isMore: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    wide() {
      return window.innerWidth > 600
    }
  },
  methods: {
    ...mapActions('user', ['getMore']),
    ...mapActions('search', ['more'])
  }
}
</script>

<style lang="stylus" scoped>
#posts
  margin-top 4em

  table
    width 100%

    .flex
      margin 0
      width 100%

      td
        padding 0.75em

  .more
    display flex
    justify-content center
    align-items center
    margin 2em 0
</style>

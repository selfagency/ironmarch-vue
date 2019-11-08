<template>
  <section v-if="posts.length" id="posts">
    <h2>Posts</h2>
    <table>
      <tr>
        <th width="30%">Meta</th>
        <th>Content</th>
      </tr>
      <tr v-for="(post, key) in posts" v-show="post.content" :key="key">
        <td valign="top">
          <router-link :to="{ name: 'user', params: { id: post.authorId } }">
            <strong v-if="post.author">{{ post.author.name }}</strong>
            <strong v-else>{{ post.authorId }}</strong>
          </router-link>
          <br />
          <small>{{ post.date | dateConv }}</small>
          <br />
          <small><router-link :to="{ name: 'post', params: { id: post.id } }">Link</router-link></small>
        </td>
        <td valign="top">
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

    <div v-if="!search && posts.length >= 10" class="more" role="none">
      <button @click="getMore({ method: 'post', params: { id: profile.id } })">
        More posts
      </button>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Posts',
  props: {
    search: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    ...mapState('user', ['profile'])
  },
  methods: {
    ...mapActions('user', ['getMore'])
  }
}
</script>

<style lang="stylus" scoped>
.read-more
  float right

.more
  display flex
  justify-content center
  align-items center
</style>

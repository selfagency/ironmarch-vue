<template>
  <section v-if="Object.values(msgs.data[0]).length" id="messages">
    <h2>Messages</h2>
    <table>
      <tr class="flex">
        <th class="none third-800">Meta</th>
        <th class="none two-third-800">Content</th>
      </tr>
      <tr v-for="(msg, key) in msgs.data" :id="`msg-${msg.id}`" :key="key" class="flex">
        <td valign="top" class="full third-800">
          <div v-if="msg.thread">
            <strong v-html="msg.thread.content"></strong>
          </div>
          <div v-if="msg.author && msg.author.name">
            <strong>From:</strong>
            <router-link :to="{ name: 'user', params: { id: msg.author.id } }">
              {{ msg.author.name }}
            </router-link>
          </div>
          <div>
            <small>{{ msg.date | dateConv }}</small>
            <br />
            <small>
              <router-link :to="{ name: 'message', params: { id: msg.id }, hash: `#msg-${msg.id}` }">
                Link
              </router-link>
            </small>
          </div>
        </td>
        <td valign="top" class="full two-third-800">
          <div v-if="trunc" class="content">
            {{ content(msg) }}
            <div class="read-more">
              <router-link :to="{ name: 'message', params: { id: msg.id }, hash: `#msg-${msg.id}` }">
                More &raquo;
              </router-link>
            </div>
          </div>
          <div v-else v-html="content(msg)"></div>
        </td>
      </tr>
    </table>

    <div v-if="msgs.isMore" class="more" role="none">
      <button @click="search ? more('message') : getMore({ method: 'message', params: { user: user.id } })">
        More messages
      </button>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Messages',
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
    msgs: {
      type: Object,
      default() {
        return {}
      }
    },
    trunc: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  watch: {
    $route() {
      this.$scrollTo(this.$route.hash)
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.$route.hash) this.$scrollTo(this.$route.hash)
      }, 1000)
    })
  },
  methods: {
    ...mapActions('user', ['getMore']),
    ...mapActions('search', ['more']),
    content(msg) {
      return this.trunc ? this.$options.filters.truncate(msg.content, 255) : msg.content
    }
  }
}
</script>

<style lang="stylus" scoped>
#messages
  table
    width 100%

    .flex
      margin 0
      width 100%

      td
        padding 0.75em

  .read-more
    float right
    font-size 0.8em

  .more
    display flex
    justify-content center
    align-items center
    margin 2em 0
</style>

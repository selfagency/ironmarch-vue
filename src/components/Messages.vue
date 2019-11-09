<template>
  <section v-if="msgs.length && Object.values(msgs[0]).length" id="messages">
    <h2>Messages</h2>
    <table>
      <tr>
        <th width="30%">Meta</th>
        <th>Content</th>
      </tr>
      <tr v-for="(msg, key) in msgs" :key="key">
        <td valign="top">
          <div v-if="msg.author && msg.author.name">
            <strong>From:</strong>
            <router-link :to="{ name: 'user', params: { id: msg.author.id } }">
              {{ msg.author.name }}
            </router-link>
          </div>
          <div v-if="msg.thread && msg.thread.recipient">
            <strong>To:</strong>
            <router-link :to="{ name: 'user', params: { id: msg.thread.recipientId } }">
              {{ msg.thread.recipient.name }}
            </router-link>
          </div>
          <div>
            <small>{{ msg.date | dateConv }}</small>
            <br />
            <small><router-link :to="{ name: 'message', params: { id: msg.id } }">Link</router-link></small>
          </div>
        </td>
        <td valign="top">
          <div v-if="msg.thread">
            <strong v-html="msg.thread.content"></strong>
          </div>
          <div class="content">
            {{ msg.content | truncate(255) }}

            <div class="read-more">
              <router-link :to="{ name: 'message', params: { id: msg.id } }">
                More &raquo;
              </router-link>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <div v-if="!search && isMore" class="more" role="none">
      <button @click="getMore({ method: 'message', params: { user: user.id } })">
        More messages
      </button>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
      type: Array,
      default() {
        return []
      }
    }
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

<template>
  <section v-if="users.length && Object.values(users).length" id="users">
    <h2>Users</h2>
    <table>
      <tr>
        <th width="15%">Name</th>
        <th width="15%">Email</th>
        <th width="15%">IP</th>
        <th>Status</th>
      </tr>
      <tr v-for="(user, key) in users" :key="key">
        <td valign="top">
          <router-link :to="{ name: 'user', params: { id: user.id } }">
            <strong>{{ user.name }}</strong>
          </router-link>
        </td>
        <td valign="top">
          {{ user.email }}
        </td>
        <td valign="top">
          {{ user.ip }}
        </td>
        <td valign="top">
          <div v-if="user.statuses.length">
            {{ user.statuses[0].content }}
          </div>
        </td>
      </tr>
    </table>

    <div v-if="!search && users.length >= 10" class="more" role="none">
      <button @click="getMore({ method: 'user', params: { id: profile.id } })">
        More users
      </button>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Users',
  props: {
    search: {
      type: Boolean,
      default: false
    },
    users: {
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
.more
  display flex
  justify-content center
  align-items center
</style>

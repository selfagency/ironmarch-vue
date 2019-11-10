<template>
  <section v-if="users.length && Object.values(users).length" id="users">
    <h2>Users</h2>
    <table>
      <tr>
        <th width="25%">Name</th>
        <th width="25%">Real Name or Alt</th>
        <th width="25%">Email</th>
        <th width="25%">Location(ish)</th>
      </tr>
      <tr v-for="(user, key) in users" :key="key">
        <td valign="top">
          <router-link :to="{ name: 'user', params: { id: user.id } }">
            <strong>{{ user.name }}</strong>
          </router-link>
        </td>
        <td valign="top">
          <span v-if="user.lookup && user.lookup.fullName">{{ user.lookup.fullName }}</span>
          <span v-if="user.nameAlt">{{ user.nameAlt | truncate(25) }}</span>
        </td>
        <td valign="top">
          {{ user.email }} <span v-if="user.emailAlt">{{ user.emailAlt }}</span>
        </td>
        <td valign="top">
          <div v-if="user.geo">{{ user.geo.city }}, {{ user.geo.region_name }}, {{ user.geo.country_code }}</div>
          <div v-else-if="user.timezone">{{ user.timezone }}</div>
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

<template>
  <section v-if="Object.values(users.data[0]).length" id="users">
    <h2>
      <div class="icon"><unicon name="users-alt" fill="#000" height="24" width="24"></unicon></div>
      <span>Users</span>
    </h2>
    <map-box :users="users.data"></map-box>
    <table>
      <tr class="flex">
        <th class="half fourth-800">Name</th>
        <th class="none fourth-800">Real Name or Alt</th>
        <th class="none fourth-800">Email</th>
        <th class="half fourth-800">Location(ish)</th>
      </tr>
      <tr v-for="(user, key) in users.data" :key="key" class="flex">
        <td valign="top" class="half fourth-800">
          <router-link :to="{ name: 'user', params: { id: user.id } }">
            <strong>{{ user.name }}</strong>
          </router-link>
        </td>
        <td valign="top" class="none fourth-800">
          <span v-if="user.lookup && user.lookup.fullName">
            <div v-tooltip="'Potential identity match'" class="icon">
              <unicon name="shield-exclamation" fill="red" width="18" height="18" />
            </div>
            {{ user.lookup.fullName }}
          </span>
          <span v-if="user.nameAlt && user.nameAlt !== user.name">{{
            user.nameAlt | truncate(25)
          }}</span>
          <span v-if="user.nameAlt2 && user.nameAlt !== user.nameAlt">{{
            user.nameAlt2 | truncate(25)
          }}</span>
        </td>
        <td valign="top" class="none fourth-800">
          {{ user.email | truncate(25) }}
          <span v-if="user.emailAlt && user.emailAlt !== user.email">{{
            user.emailAlt | truncate(25)
          }}</span>
          <span v-if="user.emailAlt2 && user.emailAlt2 !== user.emailAlt">{{
            user.emailAlt2 | truncate(25)
          }}</span>
        </td>
        <td valign="top" class="half fourth-800">
          <div v-if="user.geo && user.geo.city !== null">
            {{ user.geo.city }}, {{ user.geo.region_code }}, {{ user.geo.country_code }}
          </div>
        </td>
      </tr>
    </table>

    <div v-if="users.isMore" class="more" role="none">
      <button @click="more('user')">
        More users
      </button>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import MapBox from './Map.vue'

export default {
  name: 'Users',
  components: {
    MapBox
  },
  props: {
    users: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    ...mapActions('search', ['more'])
    // ...mapActions('user', ['moreUsers'])
  }
}
</script>

<style lang="stylus" scoped>
#users
  margin-top 4em

  h2
    .icon
      float left
      margin 0.1em 0.2em 0 0

  table
    width 100%

    .flex
      margin 0
      width 100%

  .icon
    float left
    margin 0.1em 0.2em 0 0

  .more
    display flex
    justify-content center
    align-items center
    margin 2em 0
</style>

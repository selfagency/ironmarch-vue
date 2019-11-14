<template>
  <section v-if="Object.values(users.data[0]).length" id="users">
    <h2>Users</h2>
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
          <span v-if="user.lookup && user.lookup.fullName">{{ user.lookup.fullName }}</span>
          <span v-if="user.nameAlt && user.nameAlt !== user.name">{{ user.nameAlt | truncate(25) }}</span>
          <span v-if="user.nameAlt2 && user.nameAlt !== user.nameAlt">{{ user.nameAlt2 | truncate(25) }}</span>
        </td>
        <td valign="top" class="none fourth-800">
          {{ user.email | truncate(25) }}
          <span v-if="user.emailAlt && user.emailAlt !== user.email">{{ user.emailAlt | truncate(25) }}</span>
          <span v-if="user.emailAlt2 && user.emailAlt2 !== user.emailAlt">{{ user.emailAlt2 | truncate(25) }}</span>
        </td>
        <td valign="top" class="half fourth-800">
          <div v-if="user.geo && user.geo.city !== null">{{ user.geo.city }}, {{ user.geo.region_name }}, {{ user.geo.country_code }}</div>
          <div v-if="user.geoAlt && user.geoAlt.city !== null && user.geoAlt.city !== user.geo.city">
            {{ user.geoAlt.city }}, {{ user.geoAlt.region_name }}, {{ user.geoAlt.country_code }}
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

  table
    width 100%

    .flex
      margin 0
      width 100%

  .more
    display flex
    justify-content center
    align-items center
    margin 2em 0
</style>

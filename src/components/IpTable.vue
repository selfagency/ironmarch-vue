<template>
  <div id="ips">
    <h2>
      <div class="icon"><unicon name="map-pin" fill="#000" height="24" width="24"></unicon></div>
      <span>Known IP Addresses</span>
    </h2>
    <table v-if="ipData">
      <tr class="flex">
        <th class="none third-800">IP</th>
        <th class="none third-800">Network</th>
        <th class="none third-800">Location</th>
      </tr>
      <tr v-for="(ip, key) in ipsFilter" :key="key" class="flex">
        <td class="none third-800">
          <a :href="ip.whois.net.ref.$" target="_blank">
            {{ ip.ip | truncate(28) }}
            <unicon name="external-link-alt" fill="#0074d9" width="12" height="12" />
          </a>
        </td>
        <td class="none third-800">
          {{ ref(ip) | truncate(28) }}
        </td>
        <td class="none third-800">
          {{ ip.geo.location.country_flag_emoji }} {{ ip.geo.city }}, {{ ip.geo.region_code }},
          {{ ip.geo.country_code }}
        </td>
      </tr>
    </table>

    <div v-if="ipData.length > 10" class="more" role="none">
      <button @click="showIps">{{ ips.showMore ? 'Show Less' : 'Show More' }}</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'IpTable',
  props: {
    ipData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    ...mapState('user', ['ips']),
    ipsFilter() {
      return this.ips.showMore ? this.ipData : this.ipData.slice(0, 10)
    }
  },
  methods: {
    ...mapActions('user', ['showIps']),
    ref(ip) {
      return ip.whois.net.customerRef
        ? ip.whois.net.customerRef['@name']
        : ip.whois.net.orgRef['@name']
        ? ip.whois.net.orgRef['@name']
        : null
    }
  }
}
</script>

<style lang="stylus" scoped>
#ips
  margin-top 2em
  width 100%

  h2
    .icon
      float left
      margin 0.1em 0.2em 0 0

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

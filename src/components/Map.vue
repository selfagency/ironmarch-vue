<template>
  <mgl-map :access-token="accessToken" :map-style.sync="mapStyle" :center="center" :zoom="zoom">
    <mgl-marker v-for="(user, key) in users" :key="key" :coordinates="[user.geo.longitude, user.geo.latitude]">
      <mgl-popup>
        <div>
          <strong>{{ user.name }}</strong>
          <div v-if="user.lookup && user.lookup.fullName">{{ user.lookup.fullName }}</div>
          <div v-if="user.geo">{{ user.geo.city }}, {{ user.geo.region_name }}, {{ user.geo.country_code }}</div>
          <router-link :to="{ name: 'user', params: { id: user.id } }">View profile</router-link>
        </div>
      </mgl-popup>
    </mgl-marker>
    <mgl-navigation-control position="top-right" />
  </mgl-map>
</template>

<script>
import Mapbox from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { MglMap, MglMarker, MglPopup, MglNavigationControl } from 'vue-mapbox'

export default {
  name: 'Map',
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    MglNavigationControl
  },
  props: {
    users: {
      type: Array,
      default() {
        return []
      },
      required: false
    }
  },
  data() {
    return {
      accessToken: 'pk.eyJ1Ijoic2VsZmFnZW5jeSIsImEiOiJjazJ0OWtsam0xOWJxM2NudmwybnR1cjhsIn0._iM7hdUc85pcJI3xOS0HfA',
      mapStyle: 'mapbox://styles/mapbox/light-v9',
      center: [-96, 37.8],
      zoom: 1
    }
  },
  created() {
    this.mapbox = Mapbox
  },
  methods: {}
}
</script>

<style lang="stylus">
.mgl-map-wrapper
  width 100%
  height 250px

  @media (min-width: 800px)
    height 500px

.mapboxgl-popup
  width 100%

  .mapboxgl-popup-close-button
    padding 0 10px
    color black
</style>

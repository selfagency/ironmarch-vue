<template>
  <section id="world-map"></section>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default {
  name: 'WorldMap',
  props: {
    points: {
      type: Array,
      default() {
        return []
      },
      required: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        mapboxgl.accessToken =
          'pk.eyJ1Ijoic2VsZmFnZW5jeSIsImEiOiJjazJ0OWtsam0xOWJxM2NudmwybnR1cjhsIn0._iM7hdUc85pcJI3xOS0HfA'

        const map = new mapboxgl.Map({
          container: 'world-map',
          source: 'pointsData',
          style: 'mapbox://styles/mapbox/streets-v9'
        })

        map.on('load', () => {
          map
            .addSource('pointsData', {
              type: 'geojson',
              points: this.points
            })
            .addLayer({
              id: 'points',
              source: 'pointsData',
              type: 'circle',
              paint: {
                'circle-radius': 10
              }
            })
        })
      }, 300)
    })
  }
}
</script>

<style lang="stylus" scoped></style>
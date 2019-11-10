<template>
  <mapbox
    id="map"
    :access-token="token"
    :map-options="options"
    @map-load="loaded"
    @map-click:points="clicked"
    @geolocate-error="geolocateError"
  ></mapbox>
</template>

<script>
import Mapbox from 'mapbox-gl-vue'
import 'mapbox-gl/dist/mapbox-gl.css'

export default {
  name: 'Map',
  components: {
    Mapbox
  },
  data() {
    return {
      token: 'pk.eyJ1Ijoic2VsZmFnZW5jeSIsImEiOiJjazJ0OWtsam0xOWJxM2NudmwybnR1cjhsIn0._iM7hdUc85pcJI3xOS0HfA',
      options: {
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v9',
        center: [-96, 37.8],
        zoom: 1
      }
    }
  },
  methods: {
    loaded(map) {
      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-77.03238901390978, 38.913188059745586]
                },
                properties: {
                  title: 'Mapbox DC',
                  icon: 'monument'
                }
              },
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-122.414, 37.776]
                },
                properties: {
                  title: 'Mapbox SF',
                  icon: 'harbor'
                }
              }
            ]
          }
        },
        layout: {
          'icon-image': '{icon}-15',
          'text-field': '{title}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      })
    },
    clicked(map, e) {
      const title = e.features[0].properties.title
      console.log(title)
    },
    error(control, positionError) {
      console.log(positionError)
    }
  }
}
</script>

<style lang="stylus" scoped>
#map
  width 100%
  height 500px
</style>

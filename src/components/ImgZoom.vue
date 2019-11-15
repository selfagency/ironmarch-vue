<template>
  <div :style="{ width: '100%', height: 'auto' }" @click="toggleZoom">
    <Frame :pose="pose" class="frame" />
    <ZoomImage :pose="pose" :src="src" />
  </div>
</template>

<script>
import posed from 'vue-pose'

const transition = {
  duration: 400,
  ease: [0.08, 0.69, 0.2, 0.99]
}

export default {
  components: {
    Frame: posed.div({
      zoomedOut: {
        applyAtEnd: { display: 'none' },
        opacity: 0
      },
      zoomedIn: {
        applyAtStart: { display: 'block' },
        opacity: 1
      }
    }),
    ZoomImage: posed.img({
      zoomedOut: {
        position: 'static',
        width: '100%',
        height: 'auto',
        transition,
        flip: true
      },
      zoomedIn: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transition,
        flip: true
      }
    })
  },
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data: () => ({ isZoomed: false }),
  computed: {
    pose() {
      return this.isZoomed ? 'zoomedIn' : 'zoomedOut'
    },
    toggleZoom() {
      return this.isZoomed ? this.zoomOut : this.zoomIn
    }
  },
  methods: {
    zoomIn() {
      window.addEventListener('scroll', this.zoomOut)
      this.isZoomed = true
    },
    zoomOut() {
      window.removeEventListener('scroll', this.zoomOut)
      this.isZoomed = false
    }
  }
}
</script>

<style lang="stylus" scoped>
img
  display block
  margin auto
  max-width 100%
  cursor zoom-in

img.zoomed
  cursor zoom-out

.frame
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  display none
  background rgba(255, 255, 255, 0.75)
  transform translateZ(0)
</style>

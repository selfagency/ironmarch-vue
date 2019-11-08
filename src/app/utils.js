import md5 from 'md5-hash'
import mediumZoom from 'medium-zoom'

const utils = Vue => {
  window.Console = require('consola')

  Vue.prototype.$utils = {
    hash: md5,
    zoom: mediumZoom
  }
}

export default utils

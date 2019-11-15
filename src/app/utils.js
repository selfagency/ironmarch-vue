import { converter } from 'bbfy'
import md5 from 'md5-hash'
// import mediumZoom from 'medium-zoom'

const footerOffset = () => {
  setTimeout(() => {
    const main = document.getElementsByTagName('main')[0]
    const footer = document.getElementById('footer')
    if (main) main.style.marginBottom = `${footer.offsetHeight + 40}px`
  }, 500)
}

const utils = Vue => {
  window.Console = require('consola')

  Vue.prototype.$utils = {
    bbcode: converter(),
    footerOffset,
    hash: md5
    // zoom: mediumZoom
  }
}

export default utils

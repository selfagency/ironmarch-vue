import vueDebounce from 'vue-debounce'
import VueMeta from 'vue-meta'
import VueScrollTo from 'vue-scrollto'
import Toasted from 'vue-toasted'
// import VueSkipTo from 'vue-skip-to'
import VueViewports from 'vue-viewports'

import breakpoints from '../data/breakpoints.json'

const plugins = Vue => {
  // if (window.debug) Vue.use(require('vue-axe'))
  Vue.use(vueDebounce, {
    listenTo: ['input', 'keyup']
  })
  Vue.use(VueMeta)
  Vue.use(VueScrollTo, {
    offset: -60
  })
  // Vue.use(VueSkipTo)
  Vue.use(Toasted, {
    position: 'bottom-right',
    duration: '5000'
  })
  Vue.use(VueViewports, breakpoints)
}

export default plugins

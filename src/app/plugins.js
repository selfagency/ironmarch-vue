import Toasted from 'vue-toasted'
import vueDebounce from 'vue-debounce'
import VueMeta from 'vue-meta'
import VueScrollTo from 'vue-scrollto'
import Unicon from 'vue-unicons'
import VTooltip from 'v-tooltip'

import {
  uniComment,
  uniCommentAltMessage,
  uniEnvelopes,
  uniExternalLinkAlt,
  uniLink,
  uniMapMarkerAlt,
  uniMapPin,
  uniMultiply,
  uniNotes,
  uniSearchAlt,
  uniShieldExclamation,
  uniTopArrowToTop,
  uniUserSquare,
  uniUsersAlt
} from 'vue-unicons/src/icons'

Unicon.add([
  uniComment,
  uniCommentAltMessage,
  uniEnvelopes,
  uniExternalLinkAlt,
  uniLink,
  uniMapMarkerAlt,
  uniMapPin,
  uniMultiply,
  uniNotes,
  uniSearchAlt,
  uniShieldExclamation,
  uniTopArrowToTop,
  uniUserSquare,
  uniUsersAlt
])

const plugins = Vue => {
  Vue.use(Unicon)
  Vue.use(VueMeta)

  Vue.use(VTooltip, { defaultDelay: 500 })

  Vue.use(vueDebounce, {
    listenTo: ['input', 'keyup']
  })

  Vue.use(VueScrollTo, {
    offset: -60
  })

  Vue.use(Toasted, {
    position: 'bottom-right',
    duration: '5000'
  })
}

export default plugins

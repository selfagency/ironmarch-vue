import { PulseLoader } from '@saeris/vue-spinners'
import InlineSvg from 'vue-inline-svg'

import GoBack from '../components/GoBack.vue'
import IconHeader from '../components/IconHeader.vue'

const globals = Vue => {
  Vue.component('InlineSvg', InlineSvg)
  Vue.component('Loader', PulseLoader)
  Vue.component('GoBack', GoBack)
  Vue.component('IconHeader', IconHeader)
}

export default globals

import { PulseLoader } from '@saeris/vue-spinners'
import InlineSvg from 'vue-inline-svg'

const globals = Vue => {
  Vue.component('InlineSvg', InlineSvg)
  Vue.component('Loader', PulseLoader)
}

export default globals

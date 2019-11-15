import { PulseLoader } from '@saeris/vue-spinners'
import InlineSvg from 'vue-inline-svg'

import GoBack from '../components/GoBack.vue'
import IconHeader from '../components/IconHeader.vue'
import ImgZoom from '../components/ImgZoom.vue'

const globals = Vue => {
  Vue.component('InlineSvg', InlineSvg)
  Vue.component('Loader', PulseLoader)
  Vue.component('GoBack', GoBack)
  Vue.component('IconHeader', IconHeader)
  Vue.component('ImgZoom', ImgZoom)
}

export default globals

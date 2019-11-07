// import vue + vue plugins
import Vue from 'vue'
import VueEvents from 'vue-events'
import VueMeta from 'vue-meta'
import VueSkipTo from 'vue-skip-to'
import VueViewports from 'vue-viewports'

// import application
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import store from './store'
import './registerServiceWorker'

// import global components
import InlineSvg from 'vue-inline-svg'
import SvgIcon from './components/SvgIcon.vue'

// import data
import breakpoints from './data/breakpoints.json'

// register global utils
window.debug = process.env.NODE_ENV !== 'production'
if (window.debug) window.Console = require('consola')

// register global components
Vue.component('SvgIcon', SvgIcon)
Vue.component('InlineSvg', InlineSvg)

// register plugins
// if (window.debug) Vue.use(require('vue-axe'))
Vue.use(VueEvents)
Vue.use(VueMeta)
Vue.use(VueSkipTo)
Vue.use(VueViewports, breakpoints)

// config
Vue.config.productionTip = false

// register application
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

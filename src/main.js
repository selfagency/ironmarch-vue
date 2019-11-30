// import vue + vue plugins
import Vue from 'vue'

// import application
import App from './App.vue'
import filters from './app/filters'
import globals from './app/globals'
// import i18n from './app/i18n'
import plugins from './app/plugins'
import router from './app/router'
import store from './store'
import utils from './app/utils'
import './app/regWorker'

// config
window.debug = process.env.NODE_ENV !== 'production'
Vue.config.productionTip = false

globals(Vue) // register globals
filters(Vue) // register filters
plugins(Vue) // register plugins
utils(Vue) // register utils

// register application
new Vue({
  router,
  store,
  // i18n,
  render: h => h(App)
}).$mount('#app')

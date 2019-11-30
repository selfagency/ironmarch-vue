import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import content from './modules/content'
import search from './modules/search'
import user from './modules/user'

import logo from '../assets/ironmarch.svg'

Vue.use(Vuex)

const model = () => {
  return {
    loading: false,
    error: null,
    siteUrl: 'https://www.ironmarch.exposed',
    logo
  }
}

export default new Vuex.Store({
  modules: {
    content,
    search,
    user
  },
  state() {
    return model()
  },
  mutations: {
    ERROR(state, err) {
      state.error = err
    },
    ERROR_DEL(state) {
      state.error = null
    },
    LOADING(state) {
      state.loading = !state.loading
    }
  },
  actions: {
    error({ commit }, err) {
      commit('ERROR', err)
    },
    errorReset({ commit }) {
      commit('ERROR_DEL')
    },
    loading({ commit }) {
      commit('LOADING')
    }
  },
  plugins: [
    new VuexPersistence({
      storage: window.sessionStorage
    }).plugin
  ]
})

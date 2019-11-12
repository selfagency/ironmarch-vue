import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import localforage from 'localforage'

import content from './modules/content'
import search from './modules/search'
import user from './modules/user'

import logo from '../assets/ironmarch.jpg'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: localforage
})

const model = () => {
  return {
    loading: false,
    error: null,
    siteUrl: 'https://ironmarch-web.now.sh',
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
  plugins: [vuexLocal.plugin]
})

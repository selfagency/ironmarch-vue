import Vue from 'vue'
import Vuex from 'vuex'

import * as search from './modules/search'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    search
  },
  state: {
    loading: false,
    error: null
  },
  mutations: {
    ERROR(state, err) {
      state.error = err
    }
  },
  actions: {
    error({ commit }, err) {
      commit(err)
    }
  }
})

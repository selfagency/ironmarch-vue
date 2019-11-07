import get from '../../api'

const namespaced = true

const state = {
  method: 'post',
  params: {
    terms: null,
    user: null,
    limit: 25,
    offset: 0
  },
  results: []
}

const mutations = {
  SEARCH_METHOD(state, method) {
    state.method = method
  },
  SEARCH_TERMS(state, terms) {
    state.method.users ? (state.params.user = terms) : (state.params.terms = terms)
  },
  RESULTS_ADD(state, result) {
    state.results = state.results.concat(result)
  },
  RESULTS_DEL(state) {
    state.results = []
  },
  OFFSET(state) {
    state.params.offset = state.params.offset + state.params.limit
  },
  OFFSET_DEL(state) {
    state.params.offset = 0
  }
}

const actions = {
  method({ commit, dispatch }, m) {
    commit('SEARCH_METHOD', m.substring(0, m.length - 1))
    dispatch('deleteResults')
    dispatch('offsetReset')
  },
  terms({ commit }, t) {
    commit('SEARCH_TERMS', t)
  },
  async search({ commit, state, dispatch }, event) {
    try {
      event.preventDefault()
      dispatch('deleteResults')
      dispatch('offsetReset')
      const result = await get(state.method, state.params)
      commit('RESULTS_ADD', result)
    } catch (err) {
      Console.error(err)
      commit('../ERROR', err.message)
    }
  },
  async more({ commit, state, dispatch }) {
    try {
      commit('OFFSET')
      const result = await get(state.method, state.params)
      commit('RESULTS_ADD', result)
    } catch (err) {
      Console.error(err)
      commit('../ERROR', err.message)
    }
  },
  deleteResults({ commit }) {
    commit('RESULTS_DEL')
  },
  offset({ commit }) {
    commit('OFFSET')
  },
  offsetReset({ commit }) {
    commit('OFFSET_DEL')
  }
}

export { namespaced, state, mutations, actions }

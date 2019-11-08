import get from '../../app/api'

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
    state.params.terms = terms
  },
  RESULTS_ADD(state, result) {
    result.length ? state.results.push(...result) : state.results.push(result)
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
      dispatch('loading', null, { root: true })
      dispatch('deleteResults')
      dispatch('offsetReset')
      const result = await get(state.method, state.params)
      commit('RESULTS_ADD', result)
      dispatch('loading', null, { root: true })
    } catch (err) {
      Console.error(err)
      dispatch('loading', null, { root: true })
      dispatch('error', err.message, { root: true })
    }
  },
  async more({ commit, state, dispatch }) {
    try {
      dispatch('loading', null, { root: true })
      commit('OFFSET')
      const result = await get(state.method, state.params)
      commit('RESULTS_ADD', result)
      dispatch('loading', null, { root: true })
    } catch (err) {
      Console.error(err)
      dispatch('loading', null, { root: true })
      dispatch('error', err.message, { root: true })
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

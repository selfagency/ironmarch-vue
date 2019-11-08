import get from '../../app/api'

const namespaced = true

const model = {
  method: 'post',
  params: {
    terms: null,
    user: null,
    limit: 25,
    offset: 0
  },
  results: [],
  isMore: true
}

const state = Object.assign({}, model)

const mutations = {
  SEARCH_METHOD(state, method) {
    Console.log(method)
    state.method = method
    Console.log(state.method)
  },
  SEARCH_TERMS(state, terms) {
    state.params.terms = terms
  },
  RESULTS_ADD(state, result) {
    if (result && result.length) state.results.push(...result)
  },
  RESULTS_DEL(state) {
    Object.assign(state, model)
  },
  OFFSET(state) {
    state.params.offset = state.params.offset + state.params.limit
  },
  OFFSET_DEL(state) {
    state.params.offset = 0
  },
  NO_MORE(state) {
    state.isMore = false
  }
}

const actions = {
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
      dispatch('offset')
      const result = await get(state.method, state.params)
      commit('RESULTS_ADD', result)
      if (!result || result.length < 10) dispatch('noMore')
      dispatch('loading', null, { root: true })
    } catch (err) {
      Console.error(err)
      dispatch('loading', null, { root: true })
      dispatch('error', err.message, { root: true })
    }
  },
  setMethod({ commit, dispatch }, m) {
    commit('SEARCH_METHOD', m.substring(0, m.length - 1))
    dispatch('deleteResults')
    dispatch('offsetReset')
  },
  terms({ commit }, t) {
    commit('SEARCH_TERMS', t)
  },
  deleteResults({ commit }) {
    commit('RESULTS_DEL')
  },
  offset({ commit }) {
    commit('OFFSET')
  },
  offsetReset({ commit }) {
    commit('OFFSET_DEL')
  },
  noMore({ commit }) {
    commit('NO_MORE')
  }
}

export { namespaced, state, mutations, actions }

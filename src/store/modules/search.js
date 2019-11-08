import get from '../../app/api'

const namespaced = true

const model = () => {
  return {
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
}

const state = Object.assign({}, model())

const mutations = {
  SEARCH_METHOD(state, method) {
    state.method = method
  },
  SEARCH_TERMS(state, terms) {
    state.params.terms = terms
  },
  RESULTS_ADD(state, result) {
    if (result && result.length) state.results.push(...result)
  },
  RESULTS_DEL(state) {
    const method = state.method,
      terms = state.params.terms
    Object.assign(state, model())
    state.method = method
    state.params.terms = terms
  },
  OFFSET(state) {
    state.params.offset = state.params.offset + state.params.limit
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
    dispatch('deleteResults')
    commit('SEARCH_METHOD', m.substring(0, m.length - 1))
  },
  setTerms({ commit }, t) {
    commit('SEARCH_TERMS', t)
  },
  deleteResults({ commit }) {
    commit('RESULTS_DEL')
  },
  offset({ commit }) {
    commit('OFFSET')
  },
  noMore({ commit }) {
    commit('NO_MORE')
  }
}

export { namespaced, state, mutations, actions }

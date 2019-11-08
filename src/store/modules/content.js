import queryString from 'query-string'

import get from '../../app/api'

const namespaced = true

const model = () => {
  return {
    current: {},
    messages: [],
    posts: [],
    users: []
  }
}

const state = () => model()

const mutations = {
  CONTENT_ADD(state, { method, content }) {
    content.length ? state[`${method}s`].push(...content) : state[`${method}s`].push(content)
  },
  CURRENT_SET(state, content) {
    state.current = content
  }
}

const actions = {
  async getPage({ dispatch, state }, { method, params }) {
    try {
      const hash = this._vm.$utils.hash(`${method}?${queryString.stringify(params)}`)
      let content

      dispatch('loading', null, { root: true })

      content = state[`${method}s`].filter(item => {
        return item.hash === hash
      })[0]

      if (!content) {
        content = await get(method, params)
        content.hash = hash
        dispatch('addContent', { method, content })
      }

      dispatch('setCurrent', content)
      dispatch('loading', null, { root: true })
    } catch (err) {
      Console.error(err)
      dispatch('loading', null, { root: true })
      dispatch('error', err.message, { root: true })
    }
  },
  addContent({ commit, dispatch }, method, content) {
    if (method === 'message') method = 'msg'
    if (content) commit('CONTENT_ADD', method, content)
  },
  setCurrent({ commit }, content) {
    commit('CURRENT_SET', content)
  }
}

export { namespaced, state, mutations, actions }

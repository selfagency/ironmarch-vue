import queryString from 'query-string'

import get from '../../app/api'

const namespaced = true

const state = {
  profile: {},
  msgs: [],
  posts: [],
  statuses: [],
  offsets: {
    msgs: 0,
    posts: 0
  }
}

const mutations = {
  CONTENT_ADD(state, { method, content }) {
    if (method === 'message') method = 'msg'
    state[`${method}s`].push(...content)
  },
  SET_PROFILE(state, { content }) {
    state.profile = content
  },
  OFFSET(state, { method, limit }) {
    if (method === 'message') method = 'msg'
    state.offsets[`${method}s`] = state.offsets[`${method}s`] + limit
  },
  RESET_USER(state) {
    state.msgs = []
    state.offsets = {
      msgs: 0,
      posts: 0
    }
    state.posts = []
    state.profile = {}
    state.statuses = []
  }
}

const actions = {
  async getUser({ dispatch, state, rootState }, { params }) {
    try {
      let content, posts, msgs
      const hash = this._vm.$utils.hash(`user?${queryString.stringify(params)}`),
        limit = 10

      dispatch('loading', null, { root: true })
      dispatch('resetUser')

      content =
        rootState.content.users.filter(item => {
          return item.hash === hash
        })[0] || null

      if (!content) {
        ;[content, posts, msgs] = await Promise.all([
          get('user', params),
          get('post', { user: params.id, limit, offset: state.offsets['posts'] }),
          get('msg', { user: params.id, limit, offset: state.offsets['msgs'] })
        ])

        content.hash = hash
        dispatch('addContent', { method: 'post', content: posts })
        dispatch('addContent', { method: 'msg', content: msgs })
        dispatch('addContent', { method: 'statuse', content: content.statuses })
        dispatch('setProfile', { method: 'user', content })
        dispatch('content/addContent', { method: 'user', content }, { root: true })
      }

      dispatch('loading', null, { root: true })
    } catch (err) {
      Console.error(err)
      dispatch('loading', null, { root: true })
      dispatch('error', err.message, { root: true })
    }
  },
  async getMore({ dispatch, state }, { method, params }) {
    try {
      const limit = 10

      dispatch('offset', { method, limit })
      dispatch('loading', null, { root: true })

      const content = await get(method, { user: params.id, limit, offset: state.offsets[`${method}s`] })

      dispatch('addContent', { method, content })
      dispatch('loading', null, { root: true })
    } catch (err) {
      Console.error(err)
      dispatch('loading', null, { root: true })
      dispatch('error', err.message, { root: true })
    }
  },
  addContent({ commit }, method, content) {
    commit('CONTENT_ADD', method, content)
  },
  setProfile({ commit }, content) {
    commit('SET_PROFILE', content)
  },
  offset({ commit }, method, limit) {
    commit('OFFSET', method, limit)
  },
  resetUser({ commit }, method) {
    commit('RESET_USER', method)
  }
}

export { namespaced, state, mutations, actions }

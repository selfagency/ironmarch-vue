import queryString from 'query-string'

import get from '../../app/api'

const namespaced = true

const model = () => {
  return {
    profile: {},
    msgs: [],
    posts: [],
    statuses: [],
    offsets: {
      msgs: 0,
      posts: 0
    },
    isMore: {
      msgs: true,
      posts: true
    }
  }
}

const state = () => model()

const mutations = {
  CONTENT_ADD(state, { method, content }) {
    content.length ? state[`${method}s`].push(...content) : state[`${method}s`].push(content)
  },
  SET_PROFILE(state, { content }) {
    state.profile = content
  },
  OFFSET(state, { method, limit }) {
    if (method === 'message') method = 'msg'
    state.offsets[`${method}s`] = state.offsets[`${method}s`] + limit
  },
  RESET_USER(state) {
    Object.assign(state, model())
  }
}

const actions = {
  async getUser({ dispatch, state, rootState }, { params }) {
    let content, posts, msgs
    const hash = this._vm.$utils.hash(`user?${queryString.stringify(params)}`),
      limit = 10

    try {
      dispatch('loading', null, { root: true })
      dispatch('resetUser')

      content = rootState.content.users.filter(item => {
        return item.hash === hash
      })[0]

      if (!content) {
        ;[content, posts, msgs] = await Promise.all([
          get('user', params),
          get('post', { user: params.id, limit, offset: state.offsets['posts'] }),
          get('msg', { user: params.id, limit, offset: state.offsets['msgs'] })
        ])
      }
    } catch (err) {
      Console.error(err)
      dispatch('loading', null, { root: true })
      dispatch('error', err.message, { root: true })
    } finally {
      if (Object.values(content).length) {
        content.hash = hash
        dispatch('setProfile', { method: 'user', content: content })
        dispatch('addContent', { method: 'statuse', content: content.statuses })
        dispatch('content/addContent', { method: 'user', content: [content] }, { root: true })
      }
      if (posts) dispatch('addContent', { method: 'post', content: posts })
      if (msgs) dispatch('addContent', { method: 'msg', content: msgs })
      dispatch('loading', null, { root: true })
    }
  },
  async getMore({ dispatch, state }, { method, params }) {
    try {
      const limit = 10

      dispatch('offset', { method, limit })
      dispatch('loading', null, { root: true })

      const content = await get(method, { user: params.user, limit, offset: state.offsets[`${method}s`] })

      dispatch('addContent', { method, content })
      dispatch('loading', null, { root: true })
    } catch (err) {
      Console.error(err)
      dispatch('loading', null, { root: true })
      dispatch('error', err.message, { root: true })
    }
  },
  addContent({ commit, dispatch }, method, content) {
    if (method === 'message') method = 'msg'
    if (method === 'user') {
      content && (content.length || Object.values(content).length)
        ? commit('CONTENT_ADD', method, content)
        : dispatch('error', new Error('Not found'), { root: true })
    } else {
      commit('CONTENT_ADD', method, content)
    }
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

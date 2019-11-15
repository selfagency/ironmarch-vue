import queryString from 'query-string'

import get from '../../app/api'

const model = () => {
  return {
    profile: {},
    messages: {
      data: [],
      offset: 0,
      isMore: true
    },
    posts: {
      data: [],
      offset: 0,
      isMore: true
    },
    statuses: {
      data: []
    },
    ips: {
      showMore: false
    }
  }
}

export default {
  namespaced: true,
  state() {
    return model()
  },
  mutations: {
    CONTENT_ADD(state, { method, content }) {
      content.length
        ? state[`${method}s`].data.push(...content)
        : state[`${method}s`].data.push(content)
    },
    SET_PROFILE(state, { content }) {
      state.profile = content
    },
    OFFSET(state, { method, limit }) {
      state[`${method}s`].offset = state[`${method}s`].offset + limit
    },
    RESET_USER(state) {
      Object.assign(state, model())
    },
    NO_MORE(state, { method }) {
      state[`${method}s`].isMore = false
    },
    SHOW_IPS(state) {
      state.ips.showMore = !state.ips.showMore
    }
  },
  actions: {
    async getUser({ dispatch, state, rootState }, { params }) {
      let content, posts, msgs
      const hash = this._vm.$utils.hash(`user?${queryString.stringify(params)}`),
        limit = 10

      try {
        dispatch('loading', null, { root: true })
        dispatch('resetUser')

        if (rootState.content.cache[hash]) {
          content = rootState.content.cache[hash]
          msgs = content.msgs
          posts = content.posts
          content = content.content
        } else {
          if (params && params.id) {
            ;[content, posts, msgs] = await Promise.all([
              get('user', params),
              get('post', { user: params.id, limit, offset: state['posts'].offset }),
              get('msg', { user: params.id, limit, offset: state['messages'].offset })
            ])
            dispatch(
              'content/addToCache',
              { hash, content: { content, posts, msgs } },
              { root: true }
            )
          } else {
            content = await get('user', { ...params, limit: 10, offset: 0 })
            dispatch('content/addToCache', { hash, content }, { root: true })
          }
        }

        if (Array.isArray(content)) {
          dispatch('content/setCurrent', { data: [...content], isMore: true }, { root: true })
        } else {
          if (Object.values(content).length) {
            dispatch('setProfile', { method: 'user', content: content })
            dispatch('addContent', { method: 'statuse', content: content.statuses })
          }

          if (posts) {
            dispatch('addContent', { method: 'post', content: posts })
            if (posts.length < 10) dispatch('noMore', { method: 'post' })
          }

          if (msgs) {
            dispatch('addContent', { method: 'message', content: msgs })
            if (msgs.length < 10) dispatch('noMore', { method: 'message' })
          }
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
        const content = await get(method, {
          user: params.user,
          limit,
          offset: state[`${method}s`].offset
        })
        content ? dispatch('addContent', { method, content }) : dispatch('noMore', { method })
        dispatch('loading', null, { root: true })
      } catch (err) {
        Console.error(err)
        dispatch('loading', null, { root: true })
        dispatch('error', err.message, { root: true })
      }
    },
    async moreUsers({ dispatch, rootState }) {
      content = await get('user', { ...params, limit: 10, offset: rootState.current.offset })
    },
    addContent({ commit, dispatch }, method, content) {
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
    offset({ commit }, { method, limit }) {
      commit('OFFSET', method, limit)
    },
    resetUser({ commit }, method) {
      commit('RESET_USER', method)
    },
    noMore({ commit }, method) {
      if (method === 'msg') method = 'message'
      commit('NO_MORE', method)
    },
    showIps({ commit }) {
      commit('SHOW_IPS')
    }
  }
}

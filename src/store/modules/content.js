import queryString from 'query-string'

import get from '../../app/api'

const model = () => {
  return {
    current: {},
    meta: {},
    cache: {}
  }
}

export default {
  namespaced: true,
  state() {
    return model()
  },
  mutations: {
    CURRENT_SET(state, content) {
      state.current = content
    },
    META_SET(state, content) {
      state.meta = content
    },
    CACHE(state, { hash, content }) {
      state.cache[hash] = content
    }
  },
  actions: {
    async getPage({ dispatch, state }, { method, params }) {
      try {
        const hash = this._vm.$utils.hash(`${method}?${queryString.stringify(params)}`)
        let content

        dispatch('loading', null, { root: true })

        if (state.cache[hash]) {
          content = state.cache[hash]
        } else {
          content = await get(method, params)

          if (method === 'message' && params.id) {
            content.title = content.thread.content
            content.thread = await get('thread', { id: content.threadId })
          }

          dispatch('addToCache', { hash, content })
        }

        dispatch(method === 'meta' ? 'setMeta' : 'setCurrent', content)
        dispatch('loading', null, { root: true })
      } catch (err) {
        Console.error(err)
        dispatch('loading', null, { root: true })
        dispatch('error', err.message, { root: true })
      }
    },
    addToCache({ commit }, { hash, content }) {
      commit('CACHE', { hash, content })
    },
    setCurrent({ commit }, content) {
      commit('CURRENT_SET', content)
    },
    setMeta({ commit }, content) {
      commit('META_SET', content)
    }
  }
}

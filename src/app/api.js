import ky from 'ky'
import queryString from 'query-string'

const api = async (method, params) => {
  try {
    const prefixUrl = 'https://ironmarch-api.now.sh/api'
    const payload = await ky(`${method}?${queryString.stringify(params)}`, { prefixUrl }).json()
    return payload
  } catch (err) {
    Console.error(err)
    throw err
  }
}

const get = async (method, params) => {
  try {
    if (method === 'message') method = 'msg'
    if (params.user === null) delete params.user
    const data = await api(method, params)
    return data
  } catch (err) {
    Console.error(err)
    throw err
  }
}

export default get

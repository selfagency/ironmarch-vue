import ky from 'ky'
import queryString from 'query-string'

const api = async (method, params) => {
  const prefixUrl = 'https://ironmarch-api.now.sh/api',
    query = `${method}?${queryString.stringify(params)}`

  try {
    const payload = await ky(query, { prefixUrl }).json()
    return payload
  } catch (err) {
    Console.error(query, err)
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
  }
}

export default get

import ky from 'ky'
import queryString from 'query-string'

const get = async (method, params = {}) => {
  const prefixUrl = 'https://api.ironmarch.exposed/api'
  // const prefixUrl = 'http://localhost:3031/api'
  if (method === 'message') method = 'msg'
  if (params.user === null) delete params.user
  const query = `${method}?${queryString.stringify(params)}`

  try {
    const data = await await ky(query, { prefixUrl }).json()
    return data
  } catch (err) {
    Console.error(err)
  }
}

export default get

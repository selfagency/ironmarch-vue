import ky from 'ky'
import queryString from 'query-string'

const get = async (method, params) => {
  const prefixUrl = 'https://ironmarch-api.now.sh/api'

  try {
    if (method === 'message') method = 'msg'
    if (params.user === null) delete params.user
    const query = `${method}?${queryString.stringify(params)}`
    const data = await await ky(query, { prefixUrl }).json()
    return data
  } catch (err) {
    Console.error(err)
    throw err
  }
}

export default get

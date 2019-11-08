import ky from 'ky'
import queryString from 'query-string'

const fullcontact = async params => {
  try {
    const prefixUrl = 'https://api.fullcontact.com/v2/person.json'
    const payload = await ky(`?${queryString.stringify(params)}`, {
      prefixUrl,
      headers: {
        'X-FullContact-APIKey': 'YRQtOZ9zCgFCxOo1g8BsrR3o8BDxszSd'
      }
    }).json()
    return payload
  } catch (err) {
    Console.error(err)
    return {}
  }
}

export default fullcontact

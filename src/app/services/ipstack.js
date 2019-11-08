import ky from 'ky'

const ipstack = async params => {
  try {
    const prefixUrl = 'https://api.ipstack.com/'
    const payload = await ky(`${params.ip}?access_key=9e9709eb9ef1371842d0236293bb8dcc`, {
      prefixUrl
    }).json()
    return payload
  } catch (err) {
    Console.error(err)
    return {}
  }
}

export default ipstack

import dayjs from 'dayjs'
import stripHtml from 'string-strip-html'
import truncate from 'truncate'
import smartquotes from 'smartquotes'

const chunk = (str, n) => {
  let out = [],
    i,
    len
  for (i = 0, len = str.length; i < len; i += n) {
    out.push(str.substr(i, n))
  }
  return out
}

const breakup = str => {
  str = str.split(' ')
  str = str.map(s => {
    if (s.length > 12) s = chunk(s, 12).join('\u00AD')
    return s
  })
  return str.join(' ')
}

const filters = Vue => {
  Vue.filter('capitalize', str => {
    if (!str) return ''
    return (
      str
        .toString()
        .charAt(0)
        .toUpperCase() + str.slice(1)
    )
  })

  Vue.filter('truncate', (str, ln) => {
    if (!str) return ''
    return truncate(breakup(stripHtml(str)), ln).trim()
  })

  Vue.filter('dateConv', date => {
    return dayjs.unix(date)
  })

  Vue.filter('quotes', str => {
    return smartquotes(str)
  })
}

export default filters

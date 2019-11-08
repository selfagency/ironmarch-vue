import dayjs from 'dayjs'
import stripHtml from 'string-strip-html'
import truncate from 'truncate'
import { StripChar } from 'stripchar'

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
    return truncate(StripChar.RSspecChar(stripHtml(str), '\u00AD'), ln)
  })

  Vue.filter('dateConv', date => {
    return dayjs.unix(date)
  })

  Vue.filter('strip', html => {
    if (!html) return ''
    return stripHtml(html)
  })
}

export default filters

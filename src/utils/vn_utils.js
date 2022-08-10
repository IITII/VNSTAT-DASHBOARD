/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2022/08/11
 */
'use strict'
import dayjs from 'dayjs'
import objectSupport from 'dayjs/plugin/objectSupport'

dayjs.extend(objectSupport)

export function getDateTime(dateTime, format = 'YYYY/MM/DD HH:mm') {
  let { date, time } = dateTime
  if (date?.month) {
    date.month -= 1
  }
  return dayjs({ ...date, ...time }).format(format)
}
//   export function getDateTime(dateTime, format = 'YYYY/MM/DD HH:mm') {
//   const { date, time } = dateTime
//   let res = ''
//   res += getDate(date)
//   const d = getDate(time, ':')
//   res += d.length > 0 ? ` ${d}` : d
//   return dayjs(res, 'YYYY/MM/DD HH:mm').format(format)
// }

// function getDate(date, sep = '/') {
//   if (!date) return ''
//   let dateS = ''
//   const d = new Date()
//   d.setFullYear(date.year, date.month - 1, date.day)
//   d.setHours(date.hour, date.minute, date.second)

//   const format = { year: 4, month: 2, day: 2, hour: 2, minute: 2, second: 2 }
//   Object.keys(date).forEach(k => {
//     const v = `${date[k]}`.padStart(format[k], '0')
//     dateS += dateS.length > 0 ? `${sep}${v}` : `${v}`
//   })
//   return dateS
// }

export function getTraffic(s, showUnit = true, gb = 1024 * 1024 * 1024) {
  let res = ''
  if (!s) {
    res += '0'
  } else {
    res += (s / gb).toFixed(2)
  }
  res = parseFloat(res)
  if (showUnit) {
    res += 'GB'
  }
  return res
}

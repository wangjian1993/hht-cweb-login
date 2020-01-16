export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['日', '一', '二', '三', '四', '五', '六'][value]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function formatDate (time, separator = '-', type = 'yyyy-MM-dd') {
  if (!time && typeof (time) !== 'number') {
    return ''
  }
  // 后台返回的时间戳可能是字符串类型的可能是几个时间戳
  time = time && parseInt(time)
  let ary = []
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  let min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  let sec = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  switch (type) {
    case 'hh-mm':
      ary = [hour, min]
      break
    case 'MM-dd':
      ary = [month, day]
      break
    case 'Y-M-d-h-m-s':
      let str1 = [year, month, day].join('-')
      let str2 = [hour, min, sec].join(':')
      ary = [str1, str2]
      break
    default:
      ary = [year, month, day]
  }
  return ary.join(separator)
}

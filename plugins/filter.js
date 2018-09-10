import Vue from 'vue'

export const time = function (value) {
  let date = new Date(value)
  return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
}
export const avatar = function (value) {
  return {'background': 'url(' + value + ') no-repeat left top'}
}
export const desc = function (val) {
  let res = val.length > 48 ? val.substring(0, 47) + '...' : val
  return res
}
const filters = {
  time, avatar, desc
}

for (const key in filters) {
  if (filters.hasOwnProperty(key)) {
    Vue.filter(key, filters[key])
  }
}

export default filters

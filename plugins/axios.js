import {accessToken} from '~/static/configuration.json'
export default function ({ $axios, redirect }) {
// Adds header: `Authorization: Bearer 123` to all requests
  $axios.setToken(accessToken, 'token')
  $axios.onRequest(config => {
    console.log(process.env.NODE_ENV)
    console.log('Making request to ' + config.url)
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    console.log('Making request error ' + code)
  })
}

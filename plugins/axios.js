import {accessToken} from '~/static/configuration.json'
export default function ({ $axios, redirect }) {
// Adds header: `Authorization: Bearer 123` to all requests
  $axios.setToken(accessToken, 'Bearer')
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}

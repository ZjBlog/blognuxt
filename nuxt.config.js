const bodyParser = require('body-parser')
const session = require('express-session')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css', 'normalize.css/normalize.css', 'font-awesome/css/font-awesome.css'],
  /**
   * Build configuration
   */
  plugins: [{src: '~/plugins/element-ui'}, '~/plugins/axios'],
  /**
   * loading configuration
   */
  loading: {
    color: '#00FF00'
  },
  /*
  ** Add axios globally
  */
  build: {
    filenames: {
      app: '[name].[chunkhash].js'
    },
    extractCSS: true,
    analyze: true,
    babel: {
      plugins: [['component', [
        {
          'libraryName': 'element-ui',
          'styleLibraryName': 'theme-chalk'
        }
      ]]]
    },
    // vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.entry['polyfill'] = ['babel-polyfill']
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      // if (ctx.isClient) {
      //   const { vendor } = config.entry
      //   const vendor2 = ['axios']
      //   config.entry.vendor = vendor.filter(v => !vendor2.includes(v))
      //   config.entry.vendor2 = vendor2
      //   const plugin = config.plugins.find((plugin) => ~plugin.chunkNames.indexOf('vendor'))
      //   const old = plugin.minChunks
      //   plugin.minChunks = function (module, count) {
      //     return old(module, count) && !(/(axios)|(vuetify)/).test(module.context)
      //   }
      // }
    }
  },
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true
    // proxyHeaders: false
  },
  proxy: {
    '/api': 'http://127.0.0.1:3000'
  },
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
    session({
      secret: 'super-secret-key',
      resave: false,
      name: 'blog',
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    }),
    // API middleware
    '~/api/index.js'
  ]
}

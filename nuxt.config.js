const bodyParser = require('body-parser')
const session = require('express-session')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.bootcss.com/normalize/8.0.0/normalize.min.css' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /**
   * Build configuration
   */
  plugins: [{src: '~/plugins/element-ui'}, '~/plugins/axios', '~/plugins/filter'],
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
    plugins: [
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     compress: {
      //       warnings: false,
      //       drop_console: true,
      //       pure_funcs: ['console.log']
      //     }
      //   },
      //   sourceMap: false,
      //   parallel: true
      // })
    ],
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
    // vendor: ['vue'],
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
      config.externals = {
        Swiper: 'Swiper'
      }
      // if (ctx.isClient) {
      //   const { vendor } = config.entry
      //   const vendor2 = ['vue']
      //   config.entry.vendor = vendor.filter(v => !vendor2.includes(v))
      //   config.entry.vendor2 = vendor2
      //   const plugin = config.plugins.find((plugin) => ~plugin.chunkNames.indexOf('vendor'))
      //   const old = plugin.minChunks
      //   plugin.minChunks = function (module, count) {
      //     return old(module, count) && !(/(vue)|(vuetify)/).test(module.context)
      //   }
      // }
    }
  },
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true,
    credentials: true,
    proxyHeaders: true,
    retry: { retries: 3 }
  },
  proxy: {
    '/api': 'https://gitee.com',
    '/user': 'http://127.0.0.1:3000'
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

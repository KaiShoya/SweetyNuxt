require('dotenv').config()

module.exports = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@mdi/font/css/materialdesignicons.min.css', '~/assets/style.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    [
      '@nuxtjs/google-gtag',
      {
        id: 'UA-156433872-1'
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    [
      'nuxt-buefy',
      {
        css: false,
        materialDesignIcons: false
      }
    ],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/sitemap'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.API_URL,
    exclude: ['/api/**'],
    cacheTime: 1000 * 60 * 60 * 24,
    routes() {
      const pageList = [
        `/${process.env.API_URL}`,
        `/${process.env.API_URL}/hotel`,
        `/${process.env.API_URL}/tos`
      ]
      return pageList
    }
  },
  proxy: {
    '/api/': process.env.API_URL || 'http://localhost:3000/'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  typescript: {
    typeCheck: {
      memoryLimit: 1024
    },
    ignoreNotFoundWarnings: true
  },
  serverMiddleware: [
    // API middleware
    '~/api-dist/index.js'
  ]
}

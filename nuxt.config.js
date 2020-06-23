// import dynamicRoutes from './services/generateDynamicRoutes';

require('dotenv').config();

export default {
  mode: 'universal',
  env: {
    BASE_URL: process.env.BASE_URL,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    LOGROCKET_APP_ID: process.env.LOGROCKET_APP_ID,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    STRAPI_BACKEND_URL: process.env.STRAPI_BACKEND_URL
  },
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    title: 'Jimmie Jackson Photography',
    titleTemplate: '%s | Jimmie Jackson Photography',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      {
        hid: 'description',
        name: 'description',
        content: 'Jimmie Jackson Photography - Seattle Based Landscape and Travel Photographer'
      }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: "180x180", href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: "32x32", href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@600;700;800&display=swap' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#0077be',
    height: '3px'
  },
  /*
   ** Global CSS
   */
  css: [
    '~/css/global.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   ** Icons can be found at https://antonreshetov.github.io/vue-unicons/
   */
  plugins: [
    { src: '~/plugins/vuex-persist', mode: 'client' },
    { src: '~/plugins/vue-unicons', mode: 'client' },
    { src: '~/plugins/masonry', mode: 'client' },
    '~/plugins/axios',
    '~/plugins/custom-icons',
    '~/plugins/click-outside',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo'
  ],
  /*
  ** Apollo module configuration
  */
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.STRAPI_BACKEND_URL
      }
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    https: true,
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/css/variables.scss'],
    treeShake: true,
    icons: {
      iconfont: 'vue-unicons',
    },
    theme: {
      options: {
        customProperties: true,
      },
      themes: {
        light: {
          primary: '#0077be', // water
          secondary: '#b7410e', // rust
          accent: '#e1ad01', // mustard
          info: '#759194', // stone
          warning: '#f05e23', // orange
          error: '#950714', // cranberry
          success: '#228b22', // forrest
        }
      }
    }
  },
  /*
  ** Register dynamic routes
  */
  generate: {
    // routes: dynamicRoutes,
    routes: [
      '/galleries/arizona',
      '/galleries/john-muir-trail',
      '/galleries/north-carolina',
      '/galleries/wonderland-trail',
      '/images/californian-valley',
      '/images/dark-tree',
      '/images/in-the-clouds',
      '/images/mount-rainier-national-park',
      '/images/snowy-appalachia',
      '/images/sunset-over-the-grand-canyon',
      '/images/washington-hiking',
    ]
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    standalone: true,
    extend(config, { isDev, isClient }) {
      // Run ESLint on save
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      // if (!isDev && isClient) {
      //   config.plugins.push({ src: '~/plugins/logrocket', mode: 'client' });
      // }
    },
  },
}

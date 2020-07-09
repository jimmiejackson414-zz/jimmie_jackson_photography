import dynamicRoutes from './services/generateDynamicRoutes';

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
    STRAPI_BACKEND_URL: process.env.STRAPI_BACKEND_URL,
    STRAPI_BACKEND_BASE: process.env.STRAPI_BACKEND_BASE,
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
      { hid: 'robots', name: 'robots', content: 'index, follow' },
      {
        hid: 'description',
        name: 'description',
        content: 'Jimmie Jackson Photography - Seattle Based Landscape and Travel Photographer'
      },

      // OG Tags
      { hid: 'og:title', property: 'og:title', content: 'Jimmie Jackson Photography' },
      { hid: 'og:description', property: 'og:description', content: 'Jimmie Jackson Photography - Seattle Based Landscape and Travel Photographer' },
      { hid: 'og:image', property: 'og:image', content: '/JJP_Logo_Black_V2.png' },
      { hid: 'og:url', property: 'og:url', content: 'https://www.jimmiejacksonphotography.com' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Jimmie Jackson Photography' },

      // Twitter OG tags
      { hid: 'twitter:title', property: 'twitter:title', content: 'Jimmie Jackson Photography' },
      { hid: 'twitter:description', property: 'twitter:description', content: 'Jimmie Jackson Photography - Seattle Based Landscape and Travel Photographer' },
      { hid: 'twitter:image', property: 'twitter:image', content: '/JJP_Logo_Black_V2.png' },
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: "180x180", href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: "32x32", href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'canonical', href: 'https://www.jimmiejacksonphotography.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;500;700&display=swap' }
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
    { src: '~/plugins/cloudinary', mode: 'client' },
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
    '@nuxtjs/vuetify',
    ['@nuxtjs/google-analytics', {
      id: 'UA-65927635-1',
    }]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
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
    routes: dynamicRoutes,
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

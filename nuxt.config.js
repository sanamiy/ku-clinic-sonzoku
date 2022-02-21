import theme from '@nuxt/content-theme-docs'

export default theme({
  loading: { color: '#5c84ff' },
  docs: {
    primaryColor: '#5c84ff'
  },
  css: ['static/global.css'],
  pwa: {
    meta: {
      name: '京大保健診療所の存続を求める会',
      theme_color: 'white'
    },
    manifest: {
      name: '京大保健診療所の存続を求める会',
    },
  },
  modules: ['@nuxtjs/firebase', '@nuxtjs/toast'],
  toast: {
    duration: 5000
  },
  env:{
    herokuUrl: 'https://' + process.env.HEROKU_APP_NAME + '.herokuapp.com',
    baseUrl: process.env.BASE_URL || 'https://' + process.env.HEROKU_APP_NAME + '.herokuapp.com'
  },
  firebase: {
    config: { 
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID
    },
    services:{
      auth: {
        persistence: 'local',
        ssr: false,
      },
      firestore: true,
    }
  },
  i18n: {
    locales: () => [ {
      code: 'ja',
      iso: 'ja-JP',
      file: 'ja-JP.js',
      name: '日本語' }
    // {
    //   code: 'en',
    //   iso: 'en-US',
    //   file: 'en-US.js',
    //   name: 'English'
    // }
  ],
    defaultLocale: 'ja'
  }
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  css: [
    "/assets/css/main.css",
    '@fortawesome/fontawesome-svg-core/styles.css'

  ],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    'nuxt-swiper',
  ],
  pinia: {
    autoImports: ['defineStore']
  },
  imports: {
    dirs: ['./stores']
  },
  devtools: { enabled: false },

  googleFonts: {
    families: {
      Comfortaa: true,
      'sans-serif': true,
      'Josefin+Sans': false,
    },
    display: 'swap',
  },



})


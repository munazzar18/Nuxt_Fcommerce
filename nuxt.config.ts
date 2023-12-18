// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "/assets/css/main.css",
    '@fortawesome/fontawesome-svg-core/styles.css'

  ],
  // build: {
  //   transpile: [""]
  // },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  pinia: {
    autoImports: ['defineStore']
  },
  imports: {
    dirs: ['./stores']
  },

  devtools: { enabled: false },
  // css: ['~/assets/css/main.css'],
  //   postcss: {
  // plugins: [{
  //   src: '~/plugins/fontawesome.js', mode: 'client',
  // }],

})


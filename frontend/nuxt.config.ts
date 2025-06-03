// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  // app: {
  //   head: {
  //     title: "PMS Nuxt",
  //     htmlAttrs: {
  //       lang: 'en',
  //     }
  //   }
  // },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:8000/api",
    },
  },
  modules: ['@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})

import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content'],
  css: ['./app/assests/css/mains.css'],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  runtimeConfig: {
    github: import.meta.env.PERSONAL_ACCESS_TOKENS,
    netlify_pat: import.meta.env.NETLIFY_PAT,
    site_id: import.meta.env.SITE_ID,
  },
  app: {
    head: {
      title: 'JC BLOG',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { "http-equiv": 'description', name: 'description', content: 'TS is my BLOG GTFO...or not, idk im not your therapist, im not your dad, Youre a big boy now' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/CloudLogo.svg' }
      ]
    },
  }
})

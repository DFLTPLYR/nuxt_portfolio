import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content'],
  css: ['./app/assests/css/mains.css'],
  runtimeConfig: {
    github: import.meta.env.PERSONAL_ACCESS_TOKENS,
    netlify_pat: import.meta.env.NETLIFY_PAT,
    site_id: import.meta.env.SITE_ID,
    r2_access: import.meta.env.R2_ACCESS_KEY_ID,
    r2_secret: import.meta.env.R2_SECRET_ACCESS_KEY,
    r2_account: import.meta.env.R2_ACCOUNT,
    r2_bucket: import.meta.env.R2_BUCKET,
    r2_endpoint: import.meta.env.R2_ENDPOINT,
  },
  content: {
    database: {
      type: 'd1',
      bindingName: 'PORTFOLIO_DB'
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
            sepia: 'monokai'
          }
        }
      }
    }
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  nitro: {
    preset: "cloudflare_module",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    }
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

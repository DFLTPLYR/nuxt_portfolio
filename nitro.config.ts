export default defineNitroConfig({
  compatibilityDate: "2024-09-19",
  preset: "cloudflare_module",
  cloudflare: {
    deployConfig: true,
    nodeCompat: true
  }
})


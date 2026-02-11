import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
    repo: defineCollection({
      type: 'page',
      source: {
        repository: {
          url: process.env.REPO as string,
          auth: {
            username: process.env.GITHUB_USER,
            token: process.env.PERSONAL_ACCESS_TOKENS,
          },
        },
        include: '**/*.md',
      },
    })
  }
})

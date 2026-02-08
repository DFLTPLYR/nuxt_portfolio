import { Octokit } from "octokit"

export default defineEventHandler(async (event) => {
  const env = useRuntimeConfig(event)

  try {
    const octokit = new Octokit({
      auth: env.github,
    })
    const { data: user } = await octokit.rest.users.getAuthenticated()
    const username = 'DFLTPLYR'

    const { data: commits } = await octokit.request('GET /search/commits', {
      q: `author:${username}`,
      headers: {
        Accept: 'application/vnd.github+json',
      },
    })

    return {
      login: user.login,
      id: user.id,
      total: commits.total_count,
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch commits',
    })
  }
})

import { Octokit } from "octokit"

export default defineEventHandler(async (event) => {
  const env = useRuntimeConfig(event)
  const { project } = getQuery(event)

  try {
    const octokit = new Octokit({
      auth: env.github,
    })

    const { data } = await octokit.rest.repos.listLanguages({ owner: "DFLTPLYR", repo: project as string });

    return {
      languages: data,
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch commits',
    })
  }
})

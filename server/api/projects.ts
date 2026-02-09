
import { Octokit } from "octokit"

export default defineCachedEventHandler(async (event) => {
  const env = useRuntimeConfig(event)

  try {
    const octokit = new Octokit({
      auth: env.github,
    })

    const repositories = await octokit.paginate(octokit.rest.repos.listForUser, {
      username: "DFLTPLYR",
      sort: "updated",
      direction: "desc"
    })
    const repos = await Promise.all(
      repositories.map(async repo => {
        const { data: languages } = await octokit.rest.repos.listLanguages({
          owner: repo.owner.login,
          repo: repo.name
        })
        return { ...repo, languages }
      })
    )

    return repos;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch commits',
    })
  }
}, {
  maxAge: 60 * 60 * 24,
  name: 'github-repos',
  getKey: () => 'DFLTPLYR-repos'
})

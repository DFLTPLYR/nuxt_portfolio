
import { Octokit } from "octokit"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const slug = event.context.params!.slug

  const { project } = getQuery(event)

  const octokit = new Octokit({
    auth: config.githubToken
  })

  const path = `content/${slug}.md`

  const { data } = await octokit.rest.repos.getContent({
    owner: "DFLTPLYR",
    repo: project as string,
    path
  })
  return {
    slug, data
  }
})


import { Octokit } from "octokit"
// @ts-ignore
import colors from "github-colors"

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
    });

    function getContrastColor(hexColor: string) {
      const hex = hexColor.replace('#', '')
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
      return (yiq >= 128) ? '#000000' : null
    }

    const repos = await Promise.all(
      repositories.map(async repo => {
        const { data: languages } = await octokit.rest.repos.listLanguages({
          owner: repo.owner.login,
          repo: repo.name
        })
        return {
          ...repo,
          languages: Object.keys(languages).map(lang => {
            const bgColor = colors.get(lang)?.color || '#ccc'
            const textColor = getContrastColor(bgColor)
            return {
              name: lang,
              bytes: languages[lang],
              color: bgColor,
              textColor: textColor
            }
          })
        }
      })
    );


    return await repos;
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

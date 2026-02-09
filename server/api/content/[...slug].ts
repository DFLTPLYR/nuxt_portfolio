import { Octokit } from "octokit"
import { getStore } from "@netlify/blobs"

function decodeBase64(str: string): string {
  try {
    // @ts-ignore
    if (typeof Buffer !== 'undefined') {
      // @ts-ignore
      return Buffer.from(str, 'base64').toString('utf-8')
    }
    const binary = atob(str)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return new TextDecoder().decode(bytes)
  } catch {
    return str
  }
}



export default defineEventHandler(async (event) => {
  const env = useRuntimeConfig(event)
  const slug = event.context.params!.slug
  const store = getStore({
    name: "content",
    consistency: "strong",
    siteID: env.site_id,
    token: env.netlify_pat
  })
  const metadataKey = `${slug}:metadata`
  const contentKey = `${slug}:content`

  // Check if content exists in blobs
  const hasFile = await store.get(metadataKey)

  // If content exists in storage, try to update from GitHub but don't fail if GitHub is unavailable
  if (hasFile) {
    try {
      const octokit = new Octokit({ auth: env.github })
      const cachedMetadataRaw = await store.get(metadataKey)
      let cachedMetadata = null
      if (cachedMetadataRaw && typeof cachedMetadataRaw === 'string') {
        try {
          cachedMetadata = JSON.parse(cachedMetadataRaw) as { sha: string, lastChecked: string, fileSha: string }
        } catch {
          cachedMetadata = null
        }
      }

      const { data: lastCommit } = await octokit.rest.repos.getCommit({
        owner: "DFLTPLYR",
        repo: slug as string,
        ref: "HEAD",
        per_page: 1
      })

      const currentSha = lastCommit.sha

      // Return cached version if no changes
      if (cachedMetadata && cachedMetadata.sha === currentSha) {
        const cachedContent = await store.get(contentKey)
        return {
          content: cachedContent,
          cached: true,
          lastUpdated: cachedMetadata.lastChecked
        }
      }

      // Fetch new content from GitHub
      const { data } = await octokit.rest.repos.getContent({
        owner: "DFLTPLYR",
        repo: slug as string,
        path: "/"
      })

      const readmeFile = Array.isArray(data)
        ? data.find(item => item.name.toLocaleLowerCase() === "readme.md")
        : null

      if (readmeFile) {
        const { data: fileData } = await octokit.rest.repos.getContent({
          owner: "DFLTPLYR",
          repo: slug as string,
          path: readmeFile.name
        })

        const content = 'content' in fileData && fileData.content
          ? decodeBase64(fileData.content.replace(/\n/g, ''))
          : ''

        await store.set(contentKey, content)
        await store.setJSON(metadataKey, {
          sha: currentSha,
          lastChecked: new Date().toISOString(),
          fileSha: readmeFile.sha
        })

        return {
          content: content,
          cached: false,
          lastUpdated: new Date().toISOString()
        }
      }
    } catch {
      // GitHub fetch failed, but we have cached content - return it
      const cachedContent = await store.get(contentKey)
      return {
        content: cachedContent,
        cached: true,
        lastUpdated: new Date().toISOString(),
        source: 'local'
      }
    }
  }

  // File doesn't exist locally, must fetch from GitHub
  try {
    const octokit = new Octokit({ auth: env.github })

    const { data: lastCommit } = await octokit.rest.repos.getCommit({
      owner: "DFLTPLYR",
      repo: slug as string,
      ref: "HEAD",
      per_page: 1
    })

    const { data } = await octokit.rest.repos.getContent({
      owner: "DFLTPLYR",
      repo: slug as string,
      path: "/"
    })

    const readmeFile = Array.isArray(data)
      ? data.find(item => item.name.toLocaleLowerCase() === "readme.md")
      : null

    if (!readmeFile) {
      throw createError({
        statusCode: 404,
        statusMessage: 'README.md not found in repository',
      })
    }

    const { data: fileData } = await octokit.rest.repos.getContent({
      owner: "DFLTPLYR",
      repo: slug as string,
      path: readmeFile.name
    })

    const content = 'content' in fileData && fileData.content
      ? decodeBase64(fileData.content.replace(/\n/g, ''))
      : ''

    await store.set(contentKey, content)
    await store.setJSON(metadataKey, {
      sha: lastCommit.sha,
      lastChecked: new Date().toISOString(),
      fileSha: readmeFile.sha
    })

    return {
      content: content,
      cached: false,
      lastUpdated: new Date().toISOString()
    }

  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch content',
    })
  }
})

import { Octokit } from "octokit"
import { writeFile, access, readFile } from "fs/promises"
import { join } from "path"

function decodeBase64(str: string): string {
  try {
    if (typeof Buffer !== 'undefined') {
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

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

export default defineEventHandler(async (event) => {
  const env = useRuntimeConfig(event)
  const slug = event.context.params!.slug
  const storage = useStorage('content')
  const metadataKey = `content:${slug}:metadata`
  const filePath = join(process.cwd(), 'content', `${slug}.md`)

  const hasFile = await fileExists(filePath)

  // If file exists locally, try to update from GitHub but don't fail if GitHub is unavailable
  if (hasFile) {
    try {
      const octokit = new Octokit({ auth: env.github })
      const cachedMetadata = await storage.getItem(metadataKey) as { sha: string, lastChecked: string, fileSha: string } | null

      const { data: lastCommit } = await octokit.rest.repos.getCommit({
        owner: "DFLTPLYR",
        repo: slug as string,
        ref: "HEAD",
        per_page: 1
      })

      const currentSha = lastCommit.sha

      // Return cached version if no changes
      if (cachedMetadata && cachedMetadata.sha === currentSha) {
        return {
          path: filePath,
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

        await writeFile(filePath, content, 'utf-8')

        await storage.setItem(metadataKey, {
          sha: currentSha,
          lastChecked: new Date().toISOString(),
          fileSha: readmeFile.sha
        })

        return {
          path: filePath,
          cached: false,
          lastUpdated: new Date().toISOString()
        }
      }
    } catch {
      // GitHub fetch failed, but we have local file - return it
      return {
        path: filePath,
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

    await writeFile(filePath, content, 'utf-8')

    await storage.setItem(metadataKey, {
      sha: lastCommit.sha,
      lastChecked: new Date().toISOString(),
      fileSha: readmeFile.sha
    })

    return {
      path: filePath,
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

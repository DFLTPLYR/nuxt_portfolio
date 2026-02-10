import { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

let s3Client: S3Client | null = null

export const getR2Client = () => {
  if (s3Client) return s3Client

  const config = useRuntimeConfig()

  s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${config.r2_account}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.r2_access,
      secretAccessKey: config.r2_secret,
    },
  })

  return s3Client
}

export const listMarkdownFiles = async (prefix: string = 'content/') => {
  const client = getR2Client()
  const config = useRuntimeConfig()

  const command = new ListObjectsV2Command({
    Bucket: config.r2_bucket,
    Prefix: prefix,
  })

  const response = await client.send(command)

  return response.Contents?.filter(obj => obj.Key?.endsWith('.md')) || []
}

export const getMarkdownFile = async (key: string) => {
  const client = getR2Client()
  const config = useRuntimeConfig()

  const command = new GetObjectCommand({
    Bucket: config.r2_bucket,
    Key: key,
  })

  try {
    const response = await client.send(command)

    if (!response.Body) {
      throw createError({ statusCode: 404, statusMessage: 'File not found' })
    }

    const text = await response.Body.transformToString()
    return text
  } catch (error: any) {
    if (error.name === 'NoSuchKey' || error.$fault === 'client') {
      throw createError({ statusCode: 404, statusMessage: `File not found: ${key}` })
    }
    throw error
  }
}

export const uploadMarkdownFile = async (key: string, content: string) => {
  const client = getR2Client()
  const config = useRuntimeConfig()

  const command = new PutObjectCommand({
    Bucket: config.r2_bucket,
    Key: key,
    Body: content,
    ContentType: 'text/markdown',
  })

  await client.send(command)
  return { key }
}

export const getPresignedUploadUrl = async (key: string, contentType: string = 'text/markdown') => {
  const client = getR2Client()
  const config = useRuntimeConfig()

  const command = new PutObjectCommand({
    Bucket: config.r2_bucket,
    Key: key,
    ContentType: contentType,
  })

  const url = await getSignedUrl(client, command, { expiresIn: 3600 })
  return url
}

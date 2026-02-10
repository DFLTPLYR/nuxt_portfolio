import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const uploadDirectory = async (dir: string, prefix: string = 'content/') => {
  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  })

  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      await uploadDirectory(filePath, prefix + file + '/')
    } else if (file.endsWith('.md')) {
      const content = fs.readFileSync(filePath, 'utf-8')
      const key = prefix + file

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
        Body: content,
        ContentType: 'text/markdown',
      })

      await client.send(command)
      console.log(`Uploaded: ${key}`)
    }
  }
}

uploadDirectory('content').catch(console.error)

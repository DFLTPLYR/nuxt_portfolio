import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'

dotenv.config()

const testConnection = async () => {
  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  })

  const command = new ListObjectsV2Command({
    Bucket: process.env.R2_BUCKET,
    Prefix: 'content/',
  })

  try {
    const response = await client.send(command)
    console.log('R2 Connection successful!')
    console.log('Files:', response.Contents?.map(f => f.Key))
  } catch (error) {
    console.error('R2 Connection failed:', error)
  }
}

testConnection()

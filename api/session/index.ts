import { connect } from 'mongoose'

export default async function createSession() {
  const MONGO_URL = process.env.MONGO_URL || ''
  if (!MONGO_URL) {
    throw new Error('Missing MONGO_URL')
  }

  await connect(MONGO_URL)
}

// In the above code, we initialize a MongoDB connection. If any errors are thrown, they will be handled by the server at runtime.

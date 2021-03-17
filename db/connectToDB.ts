import mongoose from 'mongoose'

export const connectToDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    useFindAndModify: false,
  })
}

import { connectToDB } from '../db'

export default async function database(req, res, next) {
  const db = await connectToDB()
  req.db = db

  next()
}

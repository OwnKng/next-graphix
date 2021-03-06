import jwt from 'next-auth/jwt'

export default async (req, res, next) => {
  const token = await jwt.getToken({ req, secret: process.env.JWT_SECRET })

  if (token) {
    req.user = token
    next()
  } else {
    res.status(401)
    res.end()
  }
}

import nc from 'next-connect'
// import type { NextApiRequest, NextApiResponse } from 'next'
import { graphics } from '../../../../api/controllers'
import middleware from '../../../../middleware/all'

const handler = nc({})

handler.use(middleware)

handler.put(async (req: any, res) => {
  try {
    await graphics.likeChart(req.user.id as string, req.query.id as string)
  } catch (error) {
    console.log(error)
  }
})

export default handler

import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { graphics } from '../../../../api/controllers'
import middleware from '../../../../middleware/all'

const handler = nc({})

handler.use(middleware)

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await graphics.deleteChart(req.query.id as string)
  } catch (error) {
    console.log(error)
  }
})

export default handler

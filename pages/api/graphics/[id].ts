import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { graphics } from '../../../db/controllers'
import middleware from '../../../middleware/all'
import onError from '../../../middleware/error'

const handler = nc({
  onError,
})

handler.use(middleware)

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const removed = await graphics.deleteChart(req.user.id as string, req.query.id as string)

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
})

export default handler

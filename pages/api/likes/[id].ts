import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { graphics } from '../../../db/controllers'
import middleware from '../../../middleware/all'
import onError from '../../../middleware/error'

const handler = nc({ onError })

handler.use(middleware)

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const liked = await graphics.likeChart(req.user.id as string, req.query.id as string)

    if (!liked) {
      return res.status(400).end()
    }

    return res.send(200).json({ data: liked })
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
})

export default handler

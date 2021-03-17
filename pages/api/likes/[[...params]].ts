import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { graphics } from '../../../db/controllers'
import middleware from '../../../middleware/all'
import onError from '../../../middleware/error'

const handler = nc({ onError })

handler.use(middleware)

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const liked = req.query.params ? req.query.params[0] : undefined
    const graphs = await graphics.likedCharts(liked)

    if (!graphs) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: graphs })
  } catch (err) {
    console.log(err)
    res.status(400).end()
  }
})

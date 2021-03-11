import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { graphics } from '../../../api/controllers/index'
import onError from '../../../middleware/error'

const handler = nc({ onError })

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const geometry = req.query.params ? req.query.params[0] : undefined
    const graphs = await graphics.getCharts(geometry)

    if (!graphs) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: graphs })
  } catch (err) {
    console.log(err)
    return res.status(400).end()
  }
})

export default handler

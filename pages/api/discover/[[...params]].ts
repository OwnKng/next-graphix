import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { graphics } from '../../../api/controllers/index'
import onError from '../../../middleware/error'

const handler = nc({ onError })

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let geometry
    let cursor
    if (req.query.params) {
      geometry = req.query.params[0]
      cursor = req.query.params[1]
    }

    const graphs = await graphics.getCharts(geometry || undefined, cursor || undefined)

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

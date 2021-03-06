import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { graphics } from '../../../db/controllers/index'
import middleware from '../../../middleware/all'
import onError from '../../../middleware/error'

const handler = nc({ onError })

handler.use(middleware)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const graphs = await graphics.createChart(req.user.id, req.body)

    if (!graphs) {
      return res.status(400).json({ error: 'Your account can only hold eight graphs' })
    }

    return res.status(200).json({ data: graphs })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: 'An error occurred' })
  }
})

export default handler

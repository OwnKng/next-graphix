import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import middleware from '../../../middleware/all'
import onError from '../../../middleware/error'
import { Data } from '../../../api/models'
import { createOne, getPublic } from '../../../api/controllers/utils'

const handler = nc({
  onError,
})

handler.use(middleware)

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const results = await getPublic(Data, req.user.id as string)

    if (!results) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: results })
  } catch (err) {
    console.log(err)
    res.status(400).end()
  }
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const results = await createOne(Data, req.user.id as string, req.body)

    if (!results) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: results })
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
})

export default handler

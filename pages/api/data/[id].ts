import nc from 'next-connect'
import middleware from '../../../middleware/all'
import onError from '../../../middleware/error'
import { Data } from '../../../db/models'
import { getOne } from '../../../db/controllers/utils'

const handler = nc({
  onError,
})

handler.use(middleware)

handler.get(async (req, res) => {
  try {
    const results = await getOne(Data, req.user.id, req.query.id)

    if (!results) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: results })
  } catch (err) {
    console.log(err)
    return res.status(400).end()
  }
})

export default handler

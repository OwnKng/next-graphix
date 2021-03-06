import nc from 'next-connect'
import { graphics } from '../../../../api/controllers/index'
import middleware from '../../../../middleware/all'

const handler = nc({})

handler.use(middleware)

handler.post(async (req, res) => {
  try {
    await graphics.createChart(req.user.id, req.body)
  } catch (err) {
    console.log(err)
  }
})

export default handler

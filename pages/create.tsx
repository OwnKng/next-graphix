import { getSession } from 'next-auth/client'
import GraphixBuilder from '../components/builder/graphicsBuilder'
import { getMany } from '../api/controllers/utils'
import { Data } from '../api/models'
import { connectToDB } from '../api/connectToDB'
import SelectionProvider from '../hooks/SelectionProvider'

const Create = () => (
  <SelectionProvider>
    <GraphixBuilder />
  </SelectionProvider>
)

export const getServerSideProps = async (context: object) => {
  const session = await getSession(context)
  await connectToDB()

  const results = await getMany(Data, session.user.id)

  const data = results.map((d) => {
    const dataset = d.toObject()
    return dataset
  })

  const props: any = {}
  props.data = data

  return {
    props,
  }
}

export default Create

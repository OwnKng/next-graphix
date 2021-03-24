import { getSession } from 'next-auth/client'
import GraphixBuilder from '../components/builder/graphicsBuilder'
import SelectionProvider from '../hooks/SelectionProvider'
import { Data } from '../db/models'
import { getPublic } from '../db/controllers/utils'
import { connectToDB } from '../db'

type CreateProps = {
  data: any[]
}

const Create = ({ data }: CreateProps) => (
  <SelectionProvider>
    <GraphixBuilder data={data} />
  </SelectionProvider>
)

export async function getServerSideProps(context: object) {
  const session = await getSession(context)

  // not signed in
  if (!session || !session.user) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    }
  }

  // get data
  await connectToDB()
  let data = await getPublic(Data, session.user.id as string)
  data = data.map((doc) => {
    const dataset = doc.toObject()
    return dataset
  })

  const props = {}
  props.data = data

  return {
    props,
  }
}

export default Create

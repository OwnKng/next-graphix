import { useState, useEffect } from 'react'
import { Menu } from '../../styled/elements/Menu'
import Control from '../../styled/elements/Control'
import { Heading } from '../../styled/elements/Heading'
import DataInput from '../../addData/DataInput'
import { useSelections } from '../../../hooks/useSelections'
import { useType } from '../../../hooks/useType'
import { Table } from '../../styled/elements/Table'
import { Button } from '../../styled/elements/Button'

const DataControls = ({ open, setOpen }) => {
  const [modal, setModal] = useState(false)
  const [datasets, setDatasets] = useState({ loading: true, dataset: null, error: null })

  const { data, updateSelections } = useSelections()
  const { types } = useType(data)

  const setData = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/data/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => updateSelections({
        data: JSON.parse(response.data.data),
      }))
      .catch((error) => console.log(error))
  }

  const getDataSets = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => setDatasets({ loading: false, dataset: response.data, error: null }))
      .catch((error) => setDatasets({ dataset: null, loading: false, error }))
  }

  useEffect(() => {
    getDataSets()
  }, [])

  const { dataset, loading, error } = datasets

  return (
    <>
      <Menu>
        <div className="title" onClick={() => setOpen('data')}>
          <Heading>Data</Heading>
        </div>
        <Control open={open}>
          <h3>Select some data</h3>
          {loading && (
            <p>Loading</p>
          )}
          {dataset && (
            <>
              <select onChange={(e) => setData(e.target.value)}>
                {dataset.map((d: object) => (
                  <option value={d._id} key={d._id}>{d.name}</option>
                ))}
              </select>
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault()
                  setModal(true)
                }}
              >
                Add more data
              </Button>
            </>
          )}
          {error && (
            <p>An error occurred</p>
          )}
          {types && (
            <Table>
              <caption>Data types</caption>
              <thead>
                <tr>
                  <th>Column</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {types.map((d) => (
                  <tr key={`${d.variable}-type`}>
                    <td>{d.variable}</td>
                    <td>{d.type}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Control>
      </Menu>
      {modal && (<DataInput toggle={() => setModal(false)} />)}
    </>
  )
}

export default DataControls

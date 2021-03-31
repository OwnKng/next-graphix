import { useState } from 'react'
import styled from 'styled-components'
import Papa from 'papaparse'
import Router from 'next/router'
import { Button } from '../styled/elements/Button'
import Modal from '../styled/elements/Modal'
import { CloseButton } from '../styled/elements/closeButton'
import DataTable from './dataTable'

type dataInputProps = {
  className: string,
  toggle: any
}

const DataInput = ({ className, toggle }: dataInputProps) => {
  const [data, setData] = useState<any>()
  const [title, setTitle] = useState<string | undefined>()

  const postData = async () => {
    const dataset = { name: title, data: JSON.stringify(data), public: false }
    const res = await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify(dataset),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.status === 200) Router.reload()
  }

  const handleCSV = (event: any) => {
    const { data, errors } = Papa.parse(event.target.value, {
      header: true,
      dynamicTyping: true,
    })

    if (errors.length) {
      setData(false)
      return null
    }
    setData(data)
  }

  return (
    <Modal maxWidth={800}>
      <CloseButton onClick={() => toggle()}>X</CloseButton>
      <div className={className}>
        <h4>Add data</h4>
        <div className="flex">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (data && title) {
                postData()
              }
            }}
          >
            <label htmlFor="dataName">
              Name of dataset
            </label>
            <input
              className="nameInput"
              id="dataName"
              name="name"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <label htmlFor="dataInput">
              Paste csv data here
            </label>
            <textarea id="dataInput" name="data" onChange={handleCSV} />
            <Button type="submit">Add new data</Button>
          </form>
          <div className="preview">
            <p>preview</p>
            {data ? (
              <DataTable data={data} />
            ) : (
              <span>Awaiting valid CSV data</span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default styled(DataInput)`
  padding: 1rem;

  h4 {
    text-align: center;
    margin-bottom: 10px;
  }

  .flex {
    display: flex;
    @media only screen and (max-width: 600px) {
      flex-direction: column;
    }
  }

  form {
    color: var(--color-paragraph);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-width: 50%;
  }

  input {
    padding: 0.5rem 0;
    width: 100%;
  }

  textarea {
    width: 100%;
    height: 200px;
    resize: none;
  }

  @media only screen and (max-width: 1000px) {
    textarea {
      height: 100px;
    }
  }

  label {
    display: block;
    text-transform: uppercase;
  }

  .preview {
    min-height: 280px;
    padding: 0 20px;
    flex-grow: 1;
    overflow: scroll;

    p {
      text-transform: uppercase;
      margin: 0px;
    }
  }
`

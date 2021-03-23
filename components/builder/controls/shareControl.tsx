import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Menu } from '../../styled/elements/Menu'
import Control from '../../styled/elements/Control'
import { Heading } from '../../styled/elements/Heading'
import { useSelections } from '../../../hooks'
import { Button } from '../../styled/elements/Button'

const ShareControls = ({ open, setOpen }) => {
  const { selections, updateSelections } = useSelections()
  const [reminder, setReminder] = useState(false)
  const [shared, setShared] = useState({ link: null, error: false })

  useEffect(() => {
    setReminder(false)
  }, [selections])

  const createGraph = async (data: object) => {
    if (!data.title.length) data = { ...data, title: 'Unnamed chart' }
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST || ''}/api/graphics`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => setShared({ link: response.data, error: response.error }))
      .catch(() => setShared({ link: null, error: 'An error occured' }))
  }

  const { link, error } = shared

  return (
    <Menu>
      <Heading onClick={() => setOpen('share')}>Share</Heading>
      <Control open={open}>
        <div>
          <input id="public" type="checkbox" checked={selections.public} onChange={() => updateSelections({ public: !selections.public })} />
          <label htmlFor="public">Post graph to Discover</label>
        </div>
        <Button
          onClick={() => {
            const required = ['data', 'x', 'y', 'theme', 'palette']
            let keys = Object.keys(selections)
            keys = keys.filter((key) => selections[key] !== false)
            required.every((v) => keys.includes(v))
              ? createGraph({ ...selections, data: JSON.stringify(selections.data) })
              : setReminder(true)
          }}
        >
          Generate Share Link
        </Button>
        {error
          && (
            <motion.span
              style={{ textAlign: 'center', margin: 0 }}
              initial={{ y: -10 }}
              animate={{ y: 0 }}
            >
              {error}
            </motion.span>
          )}
        {link && <Link href={`/discover/${link}`}>{link}</Link>}
        {reminder && (
          <span style={{ textAlign: 'center' }}>
            Can't save graph until selections are complete. Your graph must have
            an X and Y variable.
          </span>
        )}
        <Link href="/user">Manage my graphs</Link>
      </Control>
    </Menu>
  )
}

export default ShareControls

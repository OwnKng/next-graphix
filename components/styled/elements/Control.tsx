import styled from 'styled-components'
import { motion } from 'framer-motion'

const Controls = ({ open, className, children }) => {
  const variants = {
    open: { height: '350px' },
    closed: { height: '0px' },
  }
  return (
    <div className={className}>
      <motion.div
        variants={variants}
        animate={open ? 'open' : 'closed'}
        initial={false}
        transition={{
          duration: 0.25,
        }}
      >
        <div className="controls">{children}</div>
      </motion.div>
    </div>
  )
}

export default styled(Controls)`
  border-bottom: 1px solid var(--color-background);
  max-height: 320px;
  overflow-y: scroll;

  select {
    padding: 5px 0px;
  }

  h4 {
    margin: 10px 0px;
  }

  span {
    color: var(--color-paragraph);
    font-weight: bold;
    margin: 20px 0px;
  }

  .controls {
    margin: 0 1rem;
    display: flex;
    flex-direction: column;
  }
`

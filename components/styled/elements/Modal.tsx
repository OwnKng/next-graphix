import styled from 'styled-components'
import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
}

const modalVariants = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
  },
}

const Modal = ({ className, children, maxWidth = 600 }) => (
  <motion.div
    variants={variants}
    initial="inital"
    animate="animate"
    className={className}
  >
    <motion.div
      className="modal"
      variants={modalVariants}
      initial="initial"
      animate="animate"
      style={{
        maxWidth,
      }}
    >
      {children}
    </motion.div>
    <div className="backdrop" />
  </motion.div>
)

export default styled(Modal)`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    position: relative;
    background: var(--color-foreground);
    color: var(--color-paragraph);
    padding: 20px;
    width: 80%;
    max-height: 70vh;
    min-width: 240px;
    z-index: 1;
    border-radius: 10px;
    background: var(--color-background);
  }

  .backdrop {
    position: fixed;
    top: 0px;
    left: 0px;
    pointer-events: all;
    background: linear-gradient(
      142.24deg,
      rgba(0, 8, 15, 0.9) 10%,
      rgba(93, 253, 202, 0.4) 250%
    );
    backdrop-filter: blur(3px);
    width: 100vw;
    height: 100vh;
    z-index: 0;
  }
`

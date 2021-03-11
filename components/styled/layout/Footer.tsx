import styled from 'styled-components'

interface FooterProps {
    className: string
}

const Footer = ({ className }: FooterProps) => (
  <footer className={className}>
    <span>Created by Owen King</span>
  </footer>
)

export default styled(Footer)`
    bottom: 0px;
    height: 5vh;
    width: 100%;
    background: var(--color-primary);
    color: var(--color-heading);
`

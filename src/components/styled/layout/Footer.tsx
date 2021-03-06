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
    position: absolute; 
    bottom: 0px;
    width: 100%;
    background: var(--color-background);
`

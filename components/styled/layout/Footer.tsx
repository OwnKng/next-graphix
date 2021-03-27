import styled from 'styled-components'

interface FooterProps {
    className: string
}

const Footer = ({ className }: FooterProps) => (
  <footer className={className}>
    <span>
      GRAPHIX 2021 - created by
      {' '}
      <a href="http://ownkng.dev">Owen King</a>
    </span>
  </footer>
)

export default styled(Footer)`
    bottom: 0px;
    width: 100%;
    text-align: center;
    background: var(--color-primary);
    color: var(--color-heading);
    font-size: 1rem;
    padding: 10px 0px;
    border-top: 1px solid var(--color-border);

    a {
      color: var(--color-button);
    }
`

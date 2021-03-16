import styled from 'styled-components'

export const Heading = styled.button`
  background: var(--color-primary);
  border: none;
  border-bottom: 1px solid var(--color-border);
  width: 100%;
  outline: none;
  margin: 0px;
  padding: 10px;
  text-align: left;
  font-size: 1.5rem;
  color: var(--color-heading);
  text-transform: uppercase;
  transition: all 0.4s ease;

  :hover {
    background: var(--color-headingHover);
  }
`

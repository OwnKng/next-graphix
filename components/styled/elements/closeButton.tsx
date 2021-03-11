import styled from 'styled-components'

export const CloseButton = styled.button`
  position: absolute;
  top: -15px;
  right: -15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  background: var(--color-accentTwo);
  :hover {
    background: var(--color-button);
  }
`

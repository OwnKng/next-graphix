import styled from 'styled-components'

export const ButtonOptions = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 5px;
  text-transform: capitalize;
  background: var(--color-userInput);
  color: var(--color-paragraph);
  border: none;
  margin: 2px 1px;
  font-size: 1.1rem;

  :hover {
    background: var(--color-selected);
    color: var(--color-button-text);
  }

  :focus {
    outline: none;
  }
`

import styled from 'styled-components'

export const Table = styled.table`
  color: var(--color-paragraph);
  text-align: left;
  font-size: 1rem;
  width: 100%;

  th,
  td {
    padding-left: 5px;
  }

  th {
    font-size: 1.1rem;
  }

  tbody {
    tr:nth-child(odd) {
      background: var(--color-selected);
      color: var(--color-heading);
    }
  }
`

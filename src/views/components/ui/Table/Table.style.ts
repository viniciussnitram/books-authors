import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;

  table {
    margin-top: 1.5rem;
    width: 100%;
    border-collapse: collapse;
    overflow: hidden;
    border: 2px solid #ccc;
  }

  tr {
    border-bottom: 1px solid #ccc;
  }
`

export const THead = styled.thead`
  th {
    text-align: left;
    padding: 0.75rem;
  }

  th:last-child {
    text-align: right;
  }
`

export const TBody = styled.tbody`
  td {
    padding: 0.75rem;
  }

  td:last-child {
      display: flex;
      gap: 0.75rem;
      justify-content: end;
    }
`
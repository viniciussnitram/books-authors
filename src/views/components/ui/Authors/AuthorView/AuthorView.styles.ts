import styled from "styled-components";

export const AuthorViewStyled = styled.section`
  margin-top: 2.5rem;

  ul {
    list-style: none;
  }

  li + li {
    margin-top: 0.75rem;
  }

  button {
    margin-top: 2.5rem;
    display: flex;
    margin-left: auto;
  }
`;

export const AllAuthorBooks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;

  li + li {
    margin-top: initial;
  }
`
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
  }
`;

export const Main = styled.main`
  width: 80%;
  margin: auto;
  padding-top: 2.5rem;
`;

export const Tab = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;

  button.active {
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    border: none;
    transition: 0.3s;
    background-color: #007BFF;
    color: #ffffff;
    opacity: 1;
  }

  button {
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    border: none;
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
    opacity: 0.7;
  }
`
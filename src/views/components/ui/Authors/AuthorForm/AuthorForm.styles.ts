import styled from "styled-components";

export const Form = styled.form`
margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  span {
    color: red;
    font-size: 0.875rem;
  }
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  label {
    font-weight: 500;
  }
  
  input {
    box-sizing: border-box;
    outline: none;
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 0.75rem 0.5rem;
    font-family: 'Poppins', sans-serif;
  }
`;

export const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  label {
    font-weight: 500;
  }

  textarea {
    box-sizing: border-box;
    outline: none;
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 0.75rem 0.5rem;
    height: 150px;
    font-family: 'Poppins', sans-serif;
  }
`

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  label:first-child {
    font-weight: 700;
  }

  div {
    display: flex;
    gap: 0.375rem;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: end;
`
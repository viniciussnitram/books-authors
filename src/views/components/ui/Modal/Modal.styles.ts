import styled from "styled-components";

export const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(204, 204, 204, 0.651);
  `

export const ModalContent = styled.section`
    box-sizing: border-box;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 1.5rem;
    width: 90vw;
    max-width: 450px;
    max-height: 500px;
    overflow: auto;
  `;

export const ModalHeader = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;

    && h2 {
      margin: 0px;
    }
  `

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  `
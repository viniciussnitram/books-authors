import styled from "styled-components";

export const AlertOverlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(204, 204, 204, 0.651);
`;

export const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

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

export const Buttons = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: end;
`;
import styled from "styled-components";

export const StyledButton = styled.button<{ $variant?: "primary" | "secondary" | "delete" }>`
  padding: 0.5rem 0.75rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: 0.3s;

  background-color: ${({ $variant }) =>
    $variant === "primary"
      ? "#007BFF"
      : $variant === "secondary"
        ? "gray"
        : "red"};
  color: #fff;

  &:hover {
    opacity: 0.8;
  }
`;
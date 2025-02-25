import { IButtonProps } from "../../../../app/types/button";
import { StyledButton } from "./Button.styles";

const Button = ({ children, type, variant = "primary", onClick, disabled }: IButtonProps) => {
  return (
    <StyledButton $variant={variant} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
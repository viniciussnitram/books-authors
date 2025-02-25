import { ButtonHTMLAttributes } from "react";

export interface IButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "delete";
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
  disabled?: boolean
}
import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
}

export const enum ButtonVariant {
  OutlineBlack = 'outlineBlack',
  OutlinePrimary = 'outlinePrimary',
  Primary = 'primary',
  Secondary = 'secondary',
  OutlineGray = 'outlineGray',
  Delete = 'delete',
}

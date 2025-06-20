import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
}

export const enum ButtonVariant {
  OutlineBlack = 'outlineBlack',
  OutlinePrimary = 'outlinePrimary',
  SquareOutlineGray = 'squareOutlineGray',
  SquarePrimary = 'squarePrimary',
  Primary = 'primary',
  Secondary = 'secondary',
  OutlineGray = 'outlineGray',
  Delete = 'delete',
}

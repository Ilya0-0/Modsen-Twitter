import { ChangeEvent, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  variant?: InputVariant;
  error?: string;
}

export const enum InputVariant {
  Primary = 'primary',
  Search = 'search',
}

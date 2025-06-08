'use client';

import { useState } from 'react';

import { InputProps, InputVariant } from '~/shared/ui/Input/InputProps';

import EyeIcon from '/public/svg/eyeIcon.svg?react';
import EyeOffIcon from '/public/svg/eyeOffIcon.svg?react';

import styles from './styles.module.scss';

const Input = ({
  variant = InputVariant.Primary,
  onChange,
  className,
  error,
  type,
  id,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const actualType = type === 'password' && showPassword ? 'text' : type;

  const isPasswordField = type === 'password';

  const inputId = id || props.name;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`${styles.inputWrapper} ${className || ''}`}>
      <input
        id={inputId}
        type={actualType}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className={styles[variant]}
        {...props}
      />
      {isPasswordField && (
        <button
          className={styles.passwordToggle}
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      )}
      {error && (
        <label htmlFor={inputId} className={styles.errorMessage}>
          {error}
        </label>
      )}
    </div>
  );
};

export default Input;

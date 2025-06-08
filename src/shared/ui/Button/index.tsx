import { ButtonProps, ButtonVariant } from '~/shared/ui/Button/ButtonProps';

import styles from './styles.module.scss';

const Button = ({
  children,
  onClick,
  variant = ButtonVariant.Primary,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${className || ''}`}
    >
      {children}
    </button>
  );
};

export default Button;

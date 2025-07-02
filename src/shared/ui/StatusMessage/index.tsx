import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface StatusMessageProps {
  children: ReactNode;
  className?: string;
}

const StatusMessage = ({
  children,
  className,
  ...props
}: StatusMessageProps) => {
  return (
    <p {...props} className={`${styles.message} ${className || ''}`}>
      {children}
    </p>
  );
};

export default StatusMessage;

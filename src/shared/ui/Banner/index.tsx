import { ReactNode } from 'react';

interface BannerProps {
  children?: ReactNode;
  className?: string;
}

export default function Banner({ children, className }: BannerProps) {
  return <div className={`${className || ''}`}>{children}</div>;
}

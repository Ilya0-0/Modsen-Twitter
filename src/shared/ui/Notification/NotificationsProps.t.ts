import { FC, SVGProps } from 'react';

export interface NotificationProps {
  svgr: FC<SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
  variant: NotificationVariant;
  onClose: () => void;
}

export const enum NotificationVariant {
  Success = 'success',
  Error = 'error',
}

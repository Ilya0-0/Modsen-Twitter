export interface NotificationProps {
  svgr: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
  variant: NotificationVariant;
  onClose: () => void;
}

export const enum NotificationVariant {
  Success = 'success',
  Error = 'error',
}

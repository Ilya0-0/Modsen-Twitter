import { ButtonProps, ButtonVariant } from '~/shared/ui/Button/ButtonProps';

import Button from '../Button';

const DeleteButton = ({
  children,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <Button
      {...props}
      variant={ButtonVariant.Delete}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};

export default DeleteButton;

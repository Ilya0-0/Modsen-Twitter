import { ButtonProps, ButtonVariant } from '~/shared/ui/Button/ButtonProps';

import Button from '../..';

const OutlinePrimaryButton = ({
  children,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <Button
      {...props}
      variant={ButtonVariant.OutlinePrimary}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};

export default OutlinePrimaryButton;

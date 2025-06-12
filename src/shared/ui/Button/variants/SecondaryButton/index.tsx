import { ButtonProps, ButtonVariant } from '~/shared/ui/Button/ButtonProps.t';

import Button from '../..';

const SecondaryButton = ({
  children,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <Button
      {...props}
      variant={ButtonVariant.Secondary}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;

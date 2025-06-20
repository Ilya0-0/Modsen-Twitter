import { ButtonProps, ButtonVariant } from '~/shared/ui/Button/ButtonProps.t';

import Button from '../..';

const SquarePrimaryButton = ({
  children,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <Button
      {...props}
      variant={ButtonVariant.SquarePrimary}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};

export default SquarePrimaryButton;

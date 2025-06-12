import { ButtonProps, ButtonVariant } from '~/shared/ui/Button/ButtonProps.t';

import Button from '../..';

const PrimaryButton = ({
  children,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <Button
      {...props}
      variant={ButtonVariant.Primary}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};
export default PrimaryButton;

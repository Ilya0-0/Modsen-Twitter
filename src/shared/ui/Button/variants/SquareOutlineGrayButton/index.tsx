import { ButtonProps, ButtonVariant } from '~/shared/ui/Button/ButtonProps.t';

import Button from '../..';

const SquareOutlineGrayButton = ({
  children,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <Button
      {...props}
      variant={ButtonVariant.SquareOutlineGray}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};

export default SquareOutlineGrayButton;

import { ButtonProps, ButtonVariant } from '~/shared/ui/Button/ButtonProps.t';

import Button from '../..';

const OutlineGrayButton = ({
  children,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <Button
      {...props}
      variant={ButtonVariant.OutlineGray}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};

export default OutlineGrayButton;

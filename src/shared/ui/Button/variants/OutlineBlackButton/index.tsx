import { ButtonProps, ButtonVariant } from '~/shared/ui/Button/ButtonProps';

import Button from '../..';

const OutlineBlackButton = ({
  children,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <Button
      {...props}
      variant={ButtonVariant.OutlineBlack}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};

export default OutlineBlackButton;

import { InputProps, InputVariant } from '~/shared/ui/Input/InputProps';

import Input from '../..';

const PrimaryInput = ({ onChange, className, ...props }: InputProps) => {
  return (
    <Input
      {...props}
      variant={InputVariant.Primary}
      onChange={onChange}
      className={className}
    />
  );
};

export default PrimaryInput;

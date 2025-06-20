import SearchIcon from '~/public/svg/search.svg?react';
import { InputProps, InputVariant } from '~/shared/ui/Input/InputProps.t';

import Input from '../..';
import styles from './styles.module.scss';

const SearchInput = ({ onChange, className, ...props }: InputProps) => {
  return (
    <div className={styles.searchContainer}>
      <Input
        {...props}
        variant={InputVariant.Search}
        onChange={onChange}
        className={className}
      />
      <label>
        <SearchIcon />
      </label>
    </div>
  );
};

export default SearchInput;

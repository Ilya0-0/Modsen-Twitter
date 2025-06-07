import { InputProps, InputVariant } from '~/shared/ui/Input/InputProps';

import SearchIcon from '/public/svg/search.svg?react';

import Input from '../Input';
import styles from './Search.module.scss';

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

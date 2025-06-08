'use client';

import { useEffect, useRef, useState } from 'react';

import { SelectOption } from './SelectOption';
import styles from './styles.module.scss';

interface SelectProps<T> {
  selected: SelectOption<T> | null;
  options: SelectOption<T>[];
  onChange: (value: SelectOption<T>) => void;
  placeholder?: string;
}

const Select = <T,>({
  selected,
  placeholder,
  options,
  onChange,
  ...props
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(selected);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveOption(selected);
  }, [selected]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick =
    (option: SelectOption<T>) => (e: React.MouseEvent<HTMLLIElement>) => {
      e.stopPropagation();

      setIsOpen(false);
      setActiveOption(option);
      onChange(option);
    };

  const handleSelectOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      ref={rootRef}
      className={styles.selectContainer}
      onClick={handleSelectOpen}
      {...props}
    >
      <div className={styles.placeholder}>
        {activeOption?.title || placeholder}
      </div>
      {isOpen && options.length > 0 && (
        <ul className={styles.optionsList}>
          {options.map(({ value, title }) => (
            <li
              key={title}
              className={`${styles.option} ${value === activeOption?.value ? styles.optionSelected : ''}`}
              onClick={handleOptionClick({ value, title })}
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;

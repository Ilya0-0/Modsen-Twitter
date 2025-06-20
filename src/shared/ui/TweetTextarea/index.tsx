import { ChangeEvent, TextareaHTMLAttributes } from 'react';

import { MAX_TWEET_LENGTH } from '~/schemas/addTweetSchema';

import styles from './styles.module.scss';

interface TweetTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  error?: string;
}

const TweetTextarea = ({
  error,
  onChange,
  value,
  ...props
}: TweetTextAreaProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={styles.textAreaContainer}>
      <textarea
        {...props}
        value={value}
        onChange={handleChange}
        placeholder="What’s happening"
        className={styles.customTextarea}
      />
      {error && <label className={styles.errorMessage}>{error}</label>}
      <span
        className={`${styles.limit} ${value.length > MAX_TWEET_LENGTH ? styles.error : ''}`}
      >
        {value.length}/{MAX_TWEET_LENGTH}
      </span>
    </div>
  );
};

export default TweetTextarea;

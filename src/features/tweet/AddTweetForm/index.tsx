import { useState } from 'react';
import { useForm } from 'react-hook-form';

import TweetImageManager from '~/features/tweet/TweetImageManager';
import { addTweetSchema, MAX_TWEET_LENGTH } from '~/schemas/addTweetSchema';
import PrimaryButton from '~/shared/ui/Button/variants/PrimaryButton';
import TweetTextarea from '~/shared/ui/TweetTextarea';

import { yupResolver } from '@hookform/resolvers/yup';

import styles from './styles.module.scss';

export interface FileData {
  id: number;
  file: File;
}

const AddTweetForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addTweetSchema),
    defaultValues: { tweetText: '' },
  });
  const [images, setImages] = useState<FileData[]>([]);

  const onSubmit = () => {};

  const tweetText = watch('tweetText');
  const submitIsDisabled = !tweetText || tweetText.length > MAX_TWEET_LENGTH;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.flexRow}>
        <TweetTextarea
          value={tweetText}
          {...register('tweetText')}
          error={errors.tweetText?.message}
        />
        <TweetImageManager images={images} setImages={setImages} />
      </div>
      <PrimaryButton disabled={submitIsDisabled}>Tweet</PrimaryButton>
    </form>
  );
};

export default AddTweetForm;

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import TweetImageManager from '~/features/tweet/TweetImageManager';
import useNotifications from '~/hooks/useNotifications';
import { addTweetSchema, MAX_TWEET_LENGTH } from '~/schemas/addTweetSchema';
import PrimaryButton from '~/shared/ui/Button/variants/PrimaryButton';
import TweetTextarea from '~/shared/ui/TweetTextarea';
import { usePostTweetMutation } from '~/store/supabaseApi';

import { yupResolver } from '@hookform/resolvers/yup';

import { FileData } from '../tweet.t';
import styles from './styles.module.scss';

interface AddTweetFormProps {
  onCloseForm?: () => void;
}

const AddTweetForm = ({ onCloseForm }: AddTweetFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addTweetSchema),
    defaultValues: { tweetText: '' },
  });
  const { notifyError } = useNotifications();
  const [images, setImages] = useState<FileData[]>([]);
  const [createTweet, { isLoading }] = usePostTweetMutation();

  const onSubmit = async () => {
    await createTweet({ tweetText, images })
      .unwrap()
      .then(() => {
        if (onCloseForm) onCloseForm();
      })
      .catch((error) => notifyError('Tweet saving failed', error.data));
  };

  const tweetText = watch('tweetText');
  const submitIsDisabled =
    !tweetText || tweetText.length > MAX_TWEET_LENGTH || isLoading;

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
      <PrimaryButton disabled={submitIsDisabled}>
        {isLoading ? 'Posting...' : 'Tweet'}
      </PrimaryButton>
    </form>
  );
};

export default AddTweetForm;

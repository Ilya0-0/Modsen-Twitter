import * as yup from 'yup';

export const MAX_TWEET_LENGTH = 500;

export const addTweetSchema = yup.object().shape({
  tweetText: yup
    .string()
    .required("Tweet can't be empty")
    .min(1)
    .max(MAX_TWEET_LENGTH, `Tweet exceeds ${MAX_TWEET_LENGTH} characters`),
});

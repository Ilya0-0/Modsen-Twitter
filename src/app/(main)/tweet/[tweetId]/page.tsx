import { notFound, redirect } from 'next/navigation';

import { Post } from '~/store/types';
import { createClient } from '~/utils/supabase/server';

interface TweetProps {
  params: {
    tweetId: string;
  };
}

const Tweet = async ({ params }: TweetProps) => {
  const { tweetId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', tweetId)
    .single();

  if (error) {
    if (error.code === 'PGRST116' || !data) {
      notFound();
    }
    return null;
  }

  const tweet = {
    ...data,
    userId: data.user_id,
    createdAt: data.created_at,
  } as Post;

  return (
    <div>
      <h1>{tweet.content}</h1>
      <p>By User ID: {tweet.userId}</p>
      <p>Created At: {tweet.createdAt}</p>
    </div>
  );
};

export default Tweet;

import { FileData } from '~/features/tweet/tweet.t';
import { FollowRelationship, Post, UserProfile } from '~/store/types';
import { ShortProfile } from '~/store/types/shortUser';

import { createClient } from './client';

const clientSupabase = createClient();

const getAuthenticatedUserId = async (): Promise<string> => {
  const { data: userData, error: getUserError } =
    await clientSupabase.auth.getUser();

  if (getUserError || !userData?.user) {
    throw Error('User not authenticated');
  }
  return userData.user.id;
};

const checkIfFollowExists = async (
  followerId: string,
  followedId: string
): Promise<{ id: string } | null> => {
  const { data: existingFollow, error: checkError } = await clientSupabase
    .from('follows')
    .select('id')
    .eq('follower_id', followerId)
    .eq('followed_id', followedId)
    .maybeSingle();

  if (checkError) {
    throw new Error(`Failed to check follow status: ${checkError.message}`);
  }
  return existingFollow;
};

export const getProfile = async (profileId: string): Promise<UserProfile> => {
  const { data, error } = await clientSupabase
    .from('profiles')
    .select('*')
    .eq('id', profileId)
    .single();

  if (error) throw error;
  return data;
};

export const getMyProfile = async (): Promise<UserProfile> => {
  const userId = await getAuthenticatedUserId();

  const { data, error } = await clientSupabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const getPostCount = async (profileId: string): Promise<number> => {
  const { count, error } = await clientSupabase
    .from('posts')
    .select('id', { count: 'exact' })
    .eq('user_id', profileId);

  if (error) throw error;

  return count || 0;
};

export const createTweet = async (
  tweetText: string,
  images: FileData[]
): Promise<Post> => {
  const userId = await getAuthenticatedUserId();

  const { data: postData, error: postError } = await clientSupabase
    .from('posts')
    .insert({ content: tweetText, user_id: userId })
    .select()
    .single();

  if (postError || !postData) throw new Error('Failed to create post');

  let rollbackNeeded = false;
  try {
    for (const image of images) {
      const fileName = `${postData.id}-${image.id}-${image.file.name}`;

      const { error: uploadError } = await clientSupabase.storage
        .from('tweet-images')
        .upload(fileName, image.file);

      if (uploadError) {
        rollbackNeeded = true;
        throw new Error(`Failed to upload image: ${uploadError.message}`);
      }

      const { error: imageError } = await clientSupabase
        .from('post_images')
        .insert({
          post_id: postData.id,
          image_url: fileName,
        });

      if (imageError) {
        rollbackNeeded = true;
        throw new Error(`Failed to link image to post: ${imageError.message}`);
      }
    }
  } catch (error: unknown) {
    if (rollbackNeeded) {
      await clientSupabase.from('posts').delete().eq('id', postData.id);
    }
    throw error;
  }

  return {
    id: postData.id,
    createdAt: postData.created_at,
    content: postData.content,
    userId: postData.user_id,
  };
};

export const findPostByText = async (text: string): Promise<Post[]> => {
  const { data, error } = await clientSupabase
    .from('posts')
    .select('*')
    .ilike('content', `%${text}%`)
    .limit(10);

  if (error) throw new Error(error.message);

  return (
    data?.map((post) => ({
      id: post.id,
      content: post.content,
      userId: post.user_id,
      createdAt: post.created_at,
    })) || []
  );
};

export const getUnfollowedUsers = async (): Promise<ShortProfile[]> => {
  const userId = await getAuthenticatedUserId();

  const { data, error } = await clientSupabase.rpc('get_unfollowed_users', {
    p_current_user_id: userId,
  });

  if (error) throw new Error(error.message);

  const usersWithAvatarUrls = data.map((user: ShortProfile) => {
    let avatarUrl = null;

    if (user.avatarUrl) {
      const { data: publicUrlData } = clientSupabase.storage
        .from('tweet-images')
        .getPublicUrl(user.avatarUrl);

      avatarUrl = publicUrlData?.publicUrl || null;
    }

    return {
      ...user,
      avatarUrl: avatarUrl,
    };
  });

  return usersWithAvatarUrls;
};

export const followUserById = async (
  followedId: string
): Promise<FollowRelationship> => {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    throw new Error('User not authenticated.');
  }

  const existingFollow = await checkIfFollowExists(userId, followedId);

  if (existingFollow) {
    throw new Error('You are already following this user.');
  }

  const { error: followError } = await clientSupabase.from('follows').insert({
    follower_id: userId,
    followed_id: followedId,
  });

  if (followError) {
    throw new Error(`Failed to follow: ${followError.message}`);
  }

  return {
    followerId: userId,
    followedId,
  };
};

export const unFollowUserById = async (
  followedId: string
): Promise<FollowRelationship> => {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    throw new Error('User not authenticated.');
  }

  const existingFollow = await checkIfFollowExists(userId, followedId);

  if (!existingFollow) {
    throw new Error('You are not following this user.');
  }

  const { error: unfollowError } = await clientSupabase
    .from('follows')
    .delete()
    .eq('id', existingFollow.id);

  if (unfollowError) {
    throw new Error(`Failed to unfollow: ${unfollowError.message}`);
  }

  return {
    followerId: userId,
    followedId,
  };
};

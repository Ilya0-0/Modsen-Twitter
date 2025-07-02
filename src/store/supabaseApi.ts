import { TweetData } from '~/features/tweet/tweet.t';
import {
  createTweet,
  findPostByText,
  followUserById,
  getMyProfile,
  getPostCount,
  getProfile,
  getUnfollowedUsers,
  unFollowUserById,
} from '~/utils/supabase/service';

import { createApi } from '@reduxjs/toolkit/query/react';

import { FollowRelationship } from './types/followRelationship';
import { Post } from './types/post';
import { ShortProfile } from './types/shortUser';
import { UserProfile } from './types/userProfile';

export const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: async () => ({ data: null }),
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, string>({
      queryFn: async (profileId) => {
        try {
          const data = await getProfile(profileId);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    getMyProfile: builder.query<UserProfile, void>({
      queryFn: async () => {
        try {
          const data = await getMyProfile();
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    getPostCount: builder.query<number, string>({
      queryFn: async (userId) => {
        try {
          const count = await getPostCount(userId);
          return { data: count };
        } catch (error) {
          return { error };
        }
      },
    }),
    postTweet: builder.mutation<Post, TweetData>({
      queryFn: async ({ tweetText, images }) => {
        try {
          const postData = await createTweet(tweetText, images);
          return { data: postData };
        } catch (error) {
          return {
            error: {
              data: error instanceof Error ? error.message : 'Unknown error',
            },
          };
        }
      },
    }),
    searchTweets: builder.query<Post[], string>({
      queryFn: async (query) => {
        try {
          const posts = await findPostByText(query);
          return { data: posts };
        } catch (error) {
          return { error };
        }
      },
    }),
    getRecommendedUsers: builder.query<ShortProfile[], void>({
      queryFn: async () => {
        try {
          const users = await getUnfollowedUsers();
          return {
            data: users,
          };
        } catch (error) {
          return { error };
        }
      },
    }),
    followUser: builder.mutation<FollowRelationship, string>({
      queryFn: async (followedId) => {
        try {
          const followRelationship = await followUserById(followedId);
          return { data: followRelationship };
        } catch (error) {
          return { error };
        }
      },
    }),
    unfollowUser: builder.mutation<FollowRelationship, string>({
      queryFn: async (followedId) => {
        try {
          const unfollowRelationship = await unFollowUserById(followedId);
          return { data: unfollowRelationship };
        } catch (error: unknown) {
          return {
            error: { error },
          };
        }
      },
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetPostCountQuery,
  usePostTweetMutation,
  useSearchTweetsQuery,
  useGetRecommendedUsersQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetMyProfileQuery,
} = supabaseApi;

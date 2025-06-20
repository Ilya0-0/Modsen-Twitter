import { UserProfile } from '~/app/(home+profile)/profile/[userId]/userProfile.t';
import { getPostCount, getProfile } from '~/utils/supabase/service';

import { createApi } from '@reduxjs/toolkit/query/react';

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
  }),
});

export const { useGetProfileQuery, useGetPostCountQuery } = supabaseApi;

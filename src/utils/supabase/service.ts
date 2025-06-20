import { createClient } from './client';

export const getProfile = async (profileId: string) => {
  const { data, error } = await createClient()
    .from('profiles')
    .select('*')
    .eq('id', profileId)
    .single();

  if (error) throw error;
  return data;
};

export const getPostCount = async (profileId: string): Promise<number> => {
  const { count, error } = await createClient()
    .from('posts')
    .select('id', { count: 'exact' })
    .eq('user_id', profileId);

  if (error) throw error;

  return count || 0;
};

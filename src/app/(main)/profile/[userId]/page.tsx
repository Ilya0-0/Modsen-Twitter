import { redirect } from 'next/navigation';

import ProfileNotificationHandler from '~/features/auth/ui/ProfileNotificationHandler';
import { UserProfile } from '~/store/types/userProfile';
import { createClient } from '~/utils/supabase/server';
import ProfileView from '~/widgets/ProfileView';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  let errorMessage: string | undefined;

  const { userId } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/auth/login');
  }

  if (userId !== data.user.id) {
    redirect(`/profile/${data.user.id}`);
  }

  let profile: UserProfile | null = null;
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (profileError && profileError.code !== 'PGRST116') {
    errorMessage = 'Failed to load profile. Please try again.';
  } else if (!profileError && profileData) {
    profile = {
      id: profileData.id,
      name: profileData.name,
      phoneNumber: profileData.phone_number,
      birthDate: profileData.birth_date,
      email: profileData.email,
      avatarUrl: profileData.avatar_url,
      bannerUrl: profileData.banner_url,
      bio: profileData.bio,
      tgId: profileData.tg_id,
    };
  } else {
    const { data: newProfile, error: upsertError } = await supabase
      .from('profiles')
      .upsert({
        id: data.user.id,
        name:
          data.user.user_metadata?.name_from_signup_form ||
          data.user.user_metadata.name ||
          'Unnamed User',
        phone_number:
          data.user.user_metadata?.phone_number_from_signup_form || null,
        birth_date:
          data.user.user_metadata?.birth_date_from_signup_form || null,
        email: data.user.user_metadata.email,
      })
      .select()
      .single();

    if (upsertError) {
      errorMessage = `Error creating profile: ${upsertError.message}`;
    } else {
      profile = {
        id: newProfile.id,
        name: newProfile.name,
        phoneNumber: newProfile.phone_number,
        birthDate: newProfile.birth_date,
        email: newProfile.email,
        avatarUrl: newProfile.avatar_url,
        bannerUrl: newProfile.banner_url,
        bio: newProfile.bio,
        tgId: newProfile.tg_id,
      };
    }
  }

  if (!profile) {
    return redirect("/error?message=Couldn't upload or create a profile");
  }

  return (
    <>
      <ProfileNotificationHandler errorMessage={errorMessage} />
      <ProfileView profile={profile} />
    </>
  );
}

'use client';

import { useRouter } from 'next/navigation';

import { createClient } from '~/utils/supabase/client';

import { UserProfile } from './userProfile.t';

interface ProfileViewProps {
  profile: UserProfile;
}

export default function ProfileView({ profile }: ProfileViewProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
    router.refresh();
  };

  return (
    <div>
      <h1>Профиль: {profile.name}</h1>
      <p>Email: {profile.email}</p>
      <p>Телефон: {profile.phoneNumber}</p>
      <p>Дата рождения: {profile.birthDate}</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}

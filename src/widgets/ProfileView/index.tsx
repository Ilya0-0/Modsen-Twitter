'use client';

import { useEffect } from 'react';

import { useAppDispatch } from '~/hooks/useAppDispatch';
import { UserProfile } from '~/store/types';
import { setUser } from '~/store/userSlice';

interface ProfileViewProps {
  profile: UserProfile;
}

export default function ProfileView({ profile }: ProfileViewProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (profile) {
      dispatch(
        setUser({
          id: profile.id,
          name: profile.name,
        })
      );
    }
  }, [profile, dispatch]);

  return (
    <div>
      <h1>Профиль: {profile.name}</h1>
      <p>Email: {profile.email}</p>
      <p>Телефон: {profile.phoneNumber}</p>
      <p>Дата рождения: {profile.birthDate}</p>
    </div>
  );
}

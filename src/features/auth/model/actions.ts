'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '~/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/', 'layout');
  redirect(`/profile/${(await supabase.auth.getUser()).data.user?.id}`);
}

interface SignUpFormData {
  name: string;
  phoneNumber?: string;
  email: string;
  password: string;
  birthDate: string;
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data: SignUpFormData = {
    name: formData.get('name') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    birthDate: formData.get('birthDate') as string,
  };

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name_from_signup_form: data.name,
        phone_number_from_signup_form: data.phoneNumber || '',
        birth_date_from_signup_form: data.birthDate,
      },
    },
  });

  if (authError) {
    return {
      error: {
        title: 'Registration Error',
        message: authError.message,
      },
    };
  }

  if (!authData.user) {
    return {
      error: {
        title: 'Registration Failed',
        message: 'Email may already be registered. Try logging in.',
      },
    };
  }

  revalidatePath('/', 'layout');
  redirect(`/profile/${(await supabase.auth.getUser()).data.user?.id}`);
}

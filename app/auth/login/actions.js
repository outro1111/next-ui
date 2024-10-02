'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  console.log('--login 호출');
  const supabase = createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error?message=confirm your email or password please')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signOut() {
  console.log('--signOut 호출');
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/auth/login');
}
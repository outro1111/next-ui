'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const isEmail = (inputEmail) => {
  if (typeof inputEmail !== 'string') return false;  // 문자열이 아니면 false 반환
    return (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(inputEmail.trim());
  };

  console.log('--login 호출');
  const supabase = createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs

  // 서버단에서도 email 형식, password length 확인
  if(!isEmail(formData.get('email')) || formData.get('password').length < 6){
    // redirect('/error?message=confirm your email or password please')
    redirect(`/error?message=${encodeURIComponent('이메일 또는 비밀번호를 확인해 주세요')}`)
  }

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    // redirect('/error?message=confirm your email or password please')
    redirect(`/error?message=${encodeURIComponent('이메일 또는 비밀번호를 확인해 주세요')}`)
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
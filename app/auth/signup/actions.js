'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function signup(formData) {
  const isEmail = (inputEmail) => {
    if (typeof inputEmail !== 'string') return false;  // 문자열이 아니면 false 반환
      return (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(inputEmail.trim());
  };

  console.log('--signup 호출');
  const supabase = createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  
  // 서버단에서도 email 형식, password length 확인
  if(!isEmail(formData.get('email')) || formData.get('password').length < 6){
    redirect('/error?message=please input valid email and password')
  }

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
    options: {
      data: {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        department: formData.get('department'),
        position: formData.get('position')
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log(error)
    redirect('/error?message=please input valid email and password')
  }

  revalidatePath('/', 'layout')
  redirect('/auth/login')
}
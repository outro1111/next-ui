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
    redirect(`/error?message=${encodeURIComponent('올바른 형식의 이메일 또는 비밀번호를 입력해주세요.')}`)
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
    redirect(`/error?message=${encodeURIComponent('회원가입 중 에러가 발생하였습니다. 관리자에게 문의 부탁드립니다.')}`)
  }

  revalidatePath('/', 'layout')
  redirect('/auth/login')
}
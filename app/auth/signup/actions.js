'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function signup(formData) {
  console.log('--signup 호출');
  const supabase = createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  
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
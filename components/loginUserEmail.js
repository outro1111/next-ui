import { redirect } from 'next/navigation' 
import { createClient } from '@/utils/supabase/server'
import { signOut } from '@/app/auth/login/actions'
import { Button } from '@/components/ui/button'

export default async function LoginUserEmail() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  
  if (error) {
    redirect('/auth/login')
  }
  
  return (
  <div className="flex flex-1 items-center justify-end space-x-2">
    {data.user !== null ? (
      <form className="flex items-center gap-2" >
        <p>{data.user.email}</p>
        <Button formAction={signOut}>Sign Out</Button>
      </form>
    ) : (
      <p></p>
    )}
  </div>
)
}
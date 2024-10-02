'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";

// 이메일을 입력하면, 해당 이메일로 비밀번호를 변경할 수 있는 페이지 링크를 보내주는 함수
export async function sendEmailForRecoverPassword(formData) {
    console.log('----------------sendEmailForRecoverPassword start');
    const email = formData.get('email');
    if (!email) redirect("/auth/submit-email-recover?message=Enter your email to recover password");

    const supabase = createClient();
    
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    console.log(error)
    console.log('----------------sendEmailForRecoverPassword end');
    if (error) {
        redirect("/error");
    }

    redirect("/auth/login?message=An email has been sent to change your password.");
}
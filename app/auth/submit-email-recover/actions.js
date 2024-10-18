'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";

// 이메일을 입력하면, 해당 이메일로 비밀번호를 변경할 수 있는 페이지 링크를 보내주는 함수
export async function sendEmailForRecoverPassword(formData) {
    const isEmail = (inputEmail) => {
        if (typeof inputEmail !== 'string') return false;  // 문자열이 아니면 false 반환
        return (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(inputEmail.trim());
    };

    const email = formData.get('email');
    if (!email) redirect("/auth/submit-email-recover?message=Enter your email to recover password");

    // 서버단에서도 email 형식 확인
    if(!isEmail(email)){
        redirect("/auth/submit-email-recover?message=Enter your valid email to recover password");
    }
    
    const supabase = createClient();
    
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
        redirect("/error");
    }

    redirect("/auth/login?message=An email has been sent to change your password.");
}
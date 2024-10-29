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

    // 서버단에서도 입력받은 email 형식 확인
    if(!isEmail(email)){
        redirect("/auth/submit-email-recover?message=Enter your valid email to recover password");
    }
    
    const supabase = createClient();
    
    // 1. 입력받은 이메일이 존재하는지 확인
    const {data: userCnt, error: userError} = await supabase.rpc('get_user_cnt_by_email', {p_email: email});

    // 입력받은 이메일로 된 계정없으면 redirect
    if (userCnt === 0) {
        redirect(`/auth/submit-email-recover?message=${encodeURIComponent('입력하신 이메일은 존재하지 않습니다. 이메일을 확인해주세요.')}`)
    }

    // 에러가 발생한 경우
    if (userError) {
        redirect(`/error?message=${encodeURIComponent('입력하신 이메일로 계정 확인 중 에러가 발생하였습니다. 관리자에게 문의 부탁드립니다.')}`)
    }
        
    // 2. 계정이 존재함을 확인한 이메일로 비밀번호 reset을 위한 이메일 발송
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    // 에러가 발생한 경우
    if (error) {
       redirect(`/error?message=${encodeURIComponent('비밀번호 재설정 이메일 발송 중 에러가 발생하였습니다. 관리자에게 문의 부탁드립니다.')}`)
    }

    // 정상 로직을 수행한 경우
    redirect(`/auth/login?message=${encodeURIComponent('입력하신 이메일로 비밀번호 재설정 메일이 발송되었습니다.')}`);
}
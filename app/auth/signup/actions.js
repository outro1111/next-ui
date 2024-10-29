'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";

export async function recoverPassword(formData) {
    const password = formData.get('password');
    const supabase = createClient();

    // 서버단에서도 password length 확인
    if(password.length < 6){
        redirect('/error?message=confirm your recover password please')
    }
    
    // getUser()로 사용자 정보 검증
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        // 사용자 정보가 유효하지 않을 경우 처리
        redirect(`/error?message=${encodeURIComponent('올바른 인증이 필요합니다. 비밀번호 재설정 메일을 다시 수신하시기 바랍니다.')}`);
    }
    
    // 비밀번호 업데이트
    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        // 비밀번호 업데이트 오류 처리 (예: 기존 비밀번호와 동일할 경우)
        redirect(`/error?message=${encodeURIComponent('비밀번호 재설정 중 에러가 발생하였습니다. 관리자에게 문의 부탁드립니다.')}`)
    }
    
    // 일단 발생했던 세션 out 시키고 새로 로그인하도록 login 페이지로 이동
    await supabase.auth.signOut();
    redirect('/auth/login');
}
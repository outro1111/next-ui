'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";

export async function recoverPassword(formData) {
    const password = formData.get('password');
    const supabase = createClient();

    // getUser()로 사용자 정보 검증
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        // 사용자 정보가 유효하지 않을 경우 처리
        redirect('/error?message=Authentication required');
    }

    // 비밀번호 업데이트
    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        // 비밀번호 업데이트 오류 처리 (예: 기존 비밀번호와 동일할 경우)
        redirect('/error?message=' + error.message);
    }
    
    // 일단 발생했던 세션 out 시키고 새로 로그인하도록 login 페이지로 이동
    await supabase.auth.signOut();
    redirect('/auth/login');
}
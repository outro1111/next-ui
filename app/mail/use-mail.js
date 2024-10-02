import { atom, useAtom } from 'jotai';

// 초기 설정 정의
const configAtom = atom({
    selected: null, // 처음 선택된 메일 ID
});

// 메일 상태를 사용하는 커스텀 훅
export function useMail() {
    return useAtom(configAtom);
}

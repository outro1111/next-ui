import { clsx } from "clsx" //여러 클래스 이름을 결합하고 조건에 따라 클래스를 적용할 수 있게 해주는 유틸리티
import { twMerge } from "tailwind-merge" //Tailwind CSS 클래스 이름의 중복을 제거하고 최적화

//클래스 이름을 조건에 따라 동적으로 결합하고, 중복된 Tailwind CSS 클래스 이름을 병합
export function cn(...inputs) { //rest 파라미터를 사용하여 가변 인자의 목록을 배열로 전달받음
  return twMerge(clsx(inputs))
}

//주어진 날짜를 한국식 날짜 형식(ko-KR)으로 변환 /  formatDate('2024-07-31')을 호출하면 2024년 7월 31일이 반환
export function formatDate(input) {
  const date = new Date(input);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

//주어진 경로를 기본 URL과 결합하여 절대 URL을 생성
export function absoluteUrl(path) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}
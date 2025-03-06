/**
 * index.tsx
 *
 * 애플리케이션의 메인 페이지 컴포넌트입니다.
 * 고속도로 교통 정보를 표시하는 Container 컴포넌트를 렌더링합니다.
 */

import Container from "@/components/Container/Container";

/**
 * 메인 페이지 컴포넌트
 *
 * @returns {JSX.Element} 메인 페이지 JSX 요소
 */
export default function Page() {
  return (
    <main>
      <Container />
    </main>
  );
}

/**
 * 서버 사이드 렌더링 함수
 * Next.js의 getServerSideProps 함수로, 페이지 요청마다 실행됩니다.
 *
 * @returns {Object} props 객체
 */
export async function getServerSideProps() {
  return {
    props: {},
  };
}

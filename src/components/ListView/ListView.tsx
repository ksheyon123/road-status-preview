/**
 * ListView.tsx
 *
 * 데이터 목록을 표시하는 리스트 뷰 컴포넌트입니다.
 * 로딩 상태, 빈 데이터 처리, 커스텀 렌더링 등을 지원합니다.
 */

import React from "react";

/**
 * 리스트 뷰 컴포넌트의 Props 인터페이스
 *
 * @interface ListViewProps
 * @template T - 리스트 아이템의 타입
 * @property {T[]} items - 렌더링할 아이템 배열
 * @property {(item: T, index: number) => React.ReactNode} renderItem - 각 아이템을 렌더링하는 함수
 * @property {string} [className] - 추가 CSS 클래스
 * @property {string} [emptyMessage] - 데이터가 없을 때 표시할 메시지
 * @property {boolean} [isLoading] - 로딩 상태 여부
 */
export interface ListViewProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  emptyMessage?: string;
  isLoading?: boolean;
}

/**
 * 리스트 뷰 컴포넌트
 *
 * 데이터 목록을 표시하는 컴포넌트로, 로딩 상태와 빈 데이터 처리를 지원합니다.
 * 각 아이템은 renderItem 함수를 통해 커스텀 렌더링됩니다.
 *
 * @template T - 리스트 아이템의 타입
 * @param {ListViewProps<T>} props - 리스트 뷰 컴포넌트 props
 * @returns {JSX.Element} 리스트 뷰 컴포넌트 JSX 요소
 */
const ListView = <T,>({
  items,
  renderItem,
  className = "",
  emptyMessage = "데이터가 없습니다.",
  isLoading = false,
}: ListViewProps<T>) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center p-4 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-200">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};

export default ListView;

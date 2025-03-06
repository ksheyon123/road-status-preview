/**
 * List.tsx
 *
 * 범용적인 리스트 컴포넌트입니다.
 * 제네릭을 사용하여 다양한 타입의 아이템을 렌더링할 수 있습니다.
 */

import React from "react";

/**
 * 리스트 컴포넌트의 Props 인터페이스
 *
 * @interface ListProps
 * @template T - 리스트 아이템의 타입
 * @property {T[]} items - 렌더링할 아이템 배열
 * @property {(item: T, index: number) => React.ReactNode} children - 각 아이템을 렌더링하는 함수
 * @property {string} [className] - 추가 CSS 클래스
 */
interface ListProps<T> {
  items: T[];
  children: (item: T, index: number) => React.ReactNode;
  className?: string;
}

/**
 * 리스트 컴포넌트
 *
 * 제네릭을 사용하여 다양한 타입의 아이템을 렌더링하는 범용 리스트 컴포넌트입니다.
 * 각 아이템은 children 함수를 통해 렌더링됩니다.
 *
 * @template T - 리스트 아이템의 타입
 * @param {ListProps<T>} props - 리스트 컴포넌트 props
 * @returns {JSX.Element} 리스트 컴포넌트 JSX 요소
 */
const List = <T,>({ items, children, className = "" }: ListProps<T>) => {
  return (
    <div className={`w-full list-none ${className}`}>
      {items.map((item, index) => (
        <div className="w-full" key={index}>
          {children(item, index)}
        </div>
      ))}
    </div>
  );
};

export default List;

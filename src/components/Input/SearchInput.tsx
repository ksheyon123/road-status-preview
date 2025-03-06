/**
 * SearchInput.tsx
 *
 * 검색 기능을 제공하는 입력 필드 컴포넌트입니다.
 * 검색 아이콘, 입력 지우기 버튼, 엔터 키 검색 기능을 제공합니다.
 */

import React, { ChangeEvent, KeyboardEvent } from "react";
import BaseInput from "./BaseInput";
import searchIconSrc from "@/assets/images/search__glass_search_magnifying__Streamline_Core.png";

/**
 * 검색 입력 필드 컴포넌트의 Props 인터페이스
 *
 * @interface SearchInputProps
 * @property {string} value - 입력 필드의 값
 * @property {(event: ChangeEvent<HTMLInputElement>) => void} onChange - 값 변경 이벤트 핸들러
 * @property {(value: string) => void} onSearch - 검색 실행 함수
 * @property {string} [placeholder] - 플레이스홀더 텍스트
 * @property {boolean} [disabled] - 비활성화 여부
 * @property {string} [width] - 컴포넌트 너비
 */
interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  width?: string;
}

/**
 * 검색 입력 필드 컴포넌트
 *
 * 검색 기능을 제공하는 입력 필드 컴포넌트입니다.
 * 검색 아이콘, 입력 지우기 버튼, 엔터 키 검색 기능을 제공합니다.
 *
 * @param {SearchInputProps} props - 검색 입력 필드 컴포넌트 props
 * @returns {JSX.Element} 검색 입력 필드 컴포넌트 JSX 요소
 */
const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = "검색어를 입력하세요",
  disabled = false,
  width = "100%",
}) => {
  /**
   * 키 입력 이벤트 핸들러
   * 엔터 키를 누르면 검색을 실행합니다.
   *
   * @param {KeyboardEvent<HTMLInputElement>} event - 키보드 이벤트
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(value);
    }
  };

  /**
   * 입력 지우기 핸들러
   * 입력 필드의 값을 지웁니다.
   */
  const handleClear = () => {
    onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div
      data-testid="search-input-container"
      className={`relative flex items-center ${
        disabled ? "search-input-container-disabled opacity-50" : ""
      }`}
      style={{ width }}
    >
      <div className="absolute left-3">
        <img
          data-testid="search-icon"
          src={searchIconSrc.src}
          alt="search icon"
          width={20}
          height={20}
        />
      </div>
      <BaseInput
        data-testid="search-input"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full pl-10 pr-8 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {value && (
        <button
          data-testid="clear-button"
          onClick={handleClear}
          className="absolute right-3 p-1"
          disabled={disabled}
        >
          <span className="text-gray-500">×</span>
        </button>
      )}
    </div>
  );
};

export default SearchInput;

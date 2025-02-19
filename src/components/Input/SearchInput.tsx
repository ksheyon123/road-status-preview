import React, { ChangeEvent, KeyboardEvent } from "react";
import BaseInput from "./BaseInput";
import Image from "next/image";

interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  width?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = "검색어를 입력하세요",
  disabled = false,
  width = "100%",
}) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(value);
    }
  };

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
        <Image
          data-testid="search-icon"
          src="/src/assets/images/search__glass_search_magnifying__Streamline_Core.png"
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

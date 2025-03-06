/**
 * BaseInput.tsx
 *
 * 기본 입력 필드 컴포넌트입니다.
 * 다른 입력 컴포넌트의 기반이 되는 기본 입력 필드를 제공합니다.
 */

import React, { ChangeEvent, InputHTMLAttributes } from "react";

/**
 * 기본 입력 필드 컴포넌트의 Props 인터페이스
 *
 * @interface BaseInputProps
 * @extends {Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">}
 * @property {string} value - 입력 필드의 값
 * @property {(event: ChangeEvent<HTMLInputElement>) => void} onChange - 값 변경 이벤트 핸들러
 */
interface BaseInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 기본 입력 필드 컴포넌트
 *
 * 다른 입력 컴포넌트의 기반이 되는 기본 입력 필드 컴포넌트입니다.
 * 최소한의 스타일과 기능을 제공합니다.
 *
 * @param {BaseInputProps} props - 기본 입력 필드 컴포넌트 props
 * @returns {JSX.Element} 기본 입력 필드 컴포넌트 JSX 요소
 */
const BaseInput: React.FC<BaseInputProps> = ({
  value,
  onChange,
  type = "text",
  disabled = false,
  placeholder,
  className,
  ...props
}) => {
  return (
    <input
      data-testid="base-input"
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className="w-full h-full bg-transparent outline-none border-none text-[14px]"
      {...props}
    />
  );
};

export default BaseInput;

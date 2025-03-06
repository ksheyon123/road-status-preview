/**
 * BasicInput.tsx
 *
 * 기본 스타일이 적용된 입력 필드 컴포넌트입니다.
 * 레이블, 아이콘, 에러 메시지, 도움말 등의 기능을 제공합니다.
 */

import React, { ChangeEvent } from "react";
import BaseInput from "./BaseInput";

/**
 * 기본 입력 필드 컴포넌트의 Props 인터페이스
 *
 * @interface BasicInputProps
 * @extends {Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">}
 * @property {string} value - 입력 필드의 값
 * @property {(event: ChangeEvent<HTMLInputElement>) => void} onChange - 값 변경 이벤트 핸들러
 * @property {string} [className] - 추가 CSS 클래스
 * @property {string} [label] - 입력 필드 레이블
 * @property {string} [icon] - 아이콘 URL
 * @property {string} [iconClass] - 아이콘 CSS 클래스
 * @property {string} [error] - 에러 메시지
 * @property {string} [helperText] - 도움말 텍스트
 * @property {React.ReactNode} [helperIcon] - 도움말 아이콘
 * @property {number | string} [width] - 컨테이너 너비
 * @property {number | string} [height] - 컨테이너 높이
 */
export interface BasicInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  icon?: string;
  iconClass?: string;
  error?: string;
  helperText?: string;
  helperIcon?: React.ReactNode;
  width?: number | string;
  height?: number | string;
}

/**
 * 기본 입력 필드 컴포넌트
 *
 * 레이블, 아이콘, 에러 메시지, 도움말 등의 기능을 제공하는 입력 필드 컴포넌트입니다.
 * BaseInput 컴포넌트를 기반으로 추가 기능을 제공합니다.
 *
 * @param {BasicInputProps} props - 기본 입력 필드 컴포넌트 props
 * @returns {JSX.Element} 기본 입력 필드 컴포넌트 JSX 요소
 */
const BasicInput: React.FC<BasicInputProps> = ({
  value,
  onChange,
  className = "",
  label,
  icon,
  iconClass,
  error,
  helperText,
  helperIcon,
  width = 200,
  height = 60,
  ...props
}) => {
  const containerStyle = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <div style={containerStyle} className="flex flex-col">
      {/* Label */}
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Input Container */}
      <div
        className={`
            w-full
            border
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            flex w-full h-full items-center
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}
            `}
      >
        {/* Icon */}
        {icon && (
          <img src={icon} alt="input icon" className={`w-5 h-5 ${iconClass}`} />
        )}

        {/* BaseInput */}
        <BaseInput value={value} onChange={onChange} {...props} />
      </div>

      {/* Error Message */}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {/* Helper Text with Icon */}
      {(helperText || helperIcon) && (
        <div className="mt-1 flex items-center gap-1">
          {helperIcon && <span className="text-gray-500">{helperIcon}</span>}
          {helperText && <p className="text-sm text-gray-500">{helperText}</p>}
        </div>
      )}
    </div>
  );
};

export default BasicInput;

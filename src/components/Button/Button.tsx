/**
 * Button.tsx
 *
 * 재사용 가능한 버튼 컴포넌트입니다.
 * 다양한 스타일, 크기, 상태를 지원하며 아이콘을 포함할 수 있습니다.
 */

import React, { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * 버튼 컴포넌트의 Props 인터페이스
 *
 * @interface ButtonProps
 * @extends {ButtonHTMLAttributes<HTMLButtonElement>}
 * @property {"primary" | "secondary" | "text"} [variant] - 버튼 스타일 변형
 * @property {"small" | "medium" | "large"} [size] - 버튼 크기
 * @property {string} [width] - 버튼 너비
 * @property {ReactNode} [startIcon] - 버튼 시작 부분에 표시할 아이콘
 * @property {ReactNode} [endIcon] - 버튼 끝 부분에 표시할 아이콘
 * @property {ReactNode} [icon] - 아이콘 전용 버튼에 사용할 아이콘
 * @property {boolean} [iconOnly] - 아이콘만 표시할지 여부
 * @property {boolean} [loading] - 로딩 상태 여부
 * @property {boolean} [hover] - 호버 효과 사용 여부
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text";
  size?: "small" | "medium" | "large";
  width?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  icon?: ReactNode;
  iconOnly?: boolean;
  loading?: boolean;
  hover?: boolean;
}

/**
 * 버튼 컴포넌트
 *
 * 다양한 스타일과 크기를 지원하는 재사용 가능한 버튼 컴포넌트입니다.
 * 아이콘, 로딩 상태, 비활성화 상태 등을 지원합니다.
 *
 * @param {ButtonProps} props - 버튼 컴포넌트 props
 * @returns {JSX.Element} 버튼 컴포넌트 JSX 요소
 */
const Button = ({
  variant = "primary",
  size = "medium",
  width,
  startIcon,
  endIcon,
  icon,
  iconOnly = false,
  loading = false,
  disabled,
  className,
  children,
  hover = true,
  ...props
}: ButtonProps) => {
  // 기본 스타일
  const baseStyles =
    "inline-flex items-center justify-center transition-colors duration-200 focus:outline-none";

  // 크기별 스타일
  const sizeStyles = {
    small: "h-8 text-sm px-4",
    medium: "h-10 text-base px-4",
    large: "h-12 text-lg px-6",
  };

  // 변형별 스타일
  const variantStyles = {
    primary: `bg-blue-500 text-white ${
      hover ? "hover:bg-blue-600" : ""
    } focus:ring-2 focus:ring-blue-300`,
    secondary: `bg-gray-100 border border-gray-300 ${
      hover ? "hover:bg-gray-200" : ""
    } focus:ring-2 focus:ring-gray-300`,
    text: "",
  };

  // 아이콘 간격
  const iconSpacing = !iconOnly && children ? "gap-2" : "";

  // 너비 스타일
  const widthStyle = width ? `w-[${width}]` : "";

  // 비활성화 및 로딩 상태 스타일
  const stateStyles =
    disabled || loading ? "opacity-60 cursor-not-allowed" : "";

  // 최종 클래스 결합
  const finalClassName = [
    className,
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    iconSpacing,
    widthStyle,
    stateStyles,
  ]
    .filter(Boolean)
    .join(" ");

  /**
   * 로딩 스피너 컴포넌트
   *
   * 버튼이 로딩 상태일 때 표시되는 애니메이션 스피너입니다.
   *
   * @returns {JSX.Element} 로딩 스피너 JSX 요소
   */
  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      className={finalClassName}
      disabled={disabled || loading}
      {...props}
      {...(iconOnly && { "aria-label": props["aria-label"] || "button" })}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {startIcon && !iconOnly && startIcon}
          {iconOnly ? icon : children}
          {endIcon && !iconOnly && endIcon}
        </>
      )}
    </button>
  );
};

export default Button;

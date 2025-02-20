import React, { ChangeEvent } from "react";
import BaseInput from "./BaseInput";

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

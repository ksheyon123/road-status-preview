import React, { ChangeEvent } from "react";
import BaseInput from "./BaseInput";

export interface BasicInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  icon?: string;
  error?: string;
  helperText?: string;
  helperIcon?: React.ReactNode;
  width?: number;
  height?: number;
}

const BasicInput: React.FC<BasicInputProps> = ({
  value,
  onChange,
  className = "",
  label,
  icon,
  error,
  helperText,
  helperIcon,
  width = 200,
  height = 60,
  ...props
}) => {
  const containerStyle = {
    width: `${width}px`,
    minHeight: `${height}px`,
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
      <div className="relative">
        {/* Icon */}
        {icon && (
          <img
            src={icon}
            alt="input icon"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
          />
        )}

        {/* BaseInput */}
        <BaseInput
          value={value}
          onChange={onChange}
          className={`
            w-full
            px-3
            py-2
            border
            rounded-md
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            ${error ? "border-red-500" : "border-gray-300"}
            ${icon ? "pl-10" : ""}
            ${className}
          `}
          {...props}
        />
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

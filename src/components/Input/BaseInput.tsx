import React, { ChangeEvent, InputHTMLAttributes } from "react";

interface BaseInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

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
      className={className}
      {...props}
    />
  );
};

export default BaseInput;

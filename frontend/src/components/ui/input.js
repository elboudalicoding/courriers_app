import React from "react";

export const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border rounded px-3 py-2 w-full ${className}`}
      {...props}
    />
  );
};

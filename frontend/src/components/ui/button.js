import React from "react";

export const Button = ({ children, className, variant, ...props }) => {
  const baseStyle = "px-4 py-2 rounded focus:outline-none focus:ring";
  const variantStyle = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    outline: "border border-gray-500 text-gray-500 hover:bg-gray-100",
    ghost: "text-gray-500 hover:bg-gray-100",
  };

  return (
    <button className={`${baseStyle} ${variantStyle[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
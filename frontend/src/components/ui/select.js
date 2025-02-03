import React from "react";

export const Select = ({ children, className, ...props }) => {
  return (
    <select className={`form-select mt-1 block w-full ${className}`} {...props}>
      {children}
    </select>
  );
};

export const SelectItem = ({ children, ...props }) => {
  return <option {...props}>{children}</option>;
};
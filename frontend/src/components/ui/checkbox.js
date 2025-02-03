import React from "react";

export const Checkbox = ({ checked, onCheckedChange, className, ...props }) => {
  return (
    <input
      type="checkbox"
      className={`form-checkbox ${className}`}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      {...props}
    />
  );
};

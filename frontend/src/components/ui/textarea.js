import React from "react";

export const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={`form-textarea mt-1 block w-full ${className}`}
      rows="3"
      {...props}
    />
  );
};

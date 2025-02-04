import React from "react";



export const DialogContent = ({ children, className }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

export const DialogHeader = ({ children }) => {
  return (
    <div className="border-b border-gray-200 px-4 py-5 sm:px-6">{children}</div>
  );
};

export const DialogTitle = ({ children }) => {
  return (
    <h3 className="text-lg leading-6 font-medium text-gray-900">{children}</h3>
  );
};

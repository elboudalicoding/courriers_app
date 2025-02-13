import React from "react";

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96">
        {children}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => onOpenChange(false)}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

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

import React from "react";

export const Table = ({ children }) => (
  <table className="w-full border-collapse border border-gray-300 rounded-md">
    {children}
  </table>
);

export const TableHeader = ({ children }) => (
  <thead className="bg-gray-200">{children}</thead>
);

export const TableHead = ({ children }) => (
  <th className="px-4 py-2 border border-gray-300 text-left">{children}</th>
);

export const TableBody = ({ children }) => <tbody>{children}</tbody>;

export const TableRow = ({ children }) => (
  <tr className="border-b border-gray-300">{children}</tr>
);

export const TableCell = ({ children }) => (
  <td className="px-4 py-2 border border-gray-300">{children}</td>
);
export const TableType = ({ type }) => (
  <td className={`px-4 py-2 border ${type === 'urgence' ? 'bg-red-500 text-white' : type === 'confidentiel' ? 'bg-yellow-500 text-black' : ''}`}>
    {type}
  </td>
);

export const TableSupport = ({ support }) => (
  <td className="px-4 py-2 border border-gray-300">{support}</td>
);

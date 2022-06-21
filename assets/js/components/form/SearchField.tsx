import React from "react";
import { FiSearch } from "react-icons/fi";

export function SearchField() {
  return (
    <div className="flex flex-row justify-start items-center bg-gray-100 p-2 rounded-md">
      <FiSearch className="text-slate-600 mx-2" />
      <input
        className="w-50 bg-gray-100 focus:border-none focus:outline-none"
        placeholder="Search Files & Folders"
      />
    </div>
  );
}

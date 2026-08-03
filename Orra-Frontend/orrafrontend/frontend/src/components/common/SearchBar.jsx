import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({
  value = "",
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div
      className={`
        flex items-center
        w-full
        h-[58px]
        px-6
        rounded-xl
        border border-gray-200
        bg-white
        shadow-md
        ${className}
      `}
    >
      <Search className="w-5 h-5 text-gray-500 mr-4 shrink-0" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          flex-1
          bg-transparent
          outline-none
          border-none
          text-[16px]
          text-gray-800
          placeholder:text-gray-400
        "
      />
    </div>
  );
};

export default SearchBar;
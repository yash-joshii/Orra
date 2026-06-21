import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search gear...",
  className = "",
  inputClassName = "",
}) => {
  return (
    <div
      className={`${className} hidden lg:flex items-center bg-gray-100 w-[90%] rounded-full px-3 py-2 border border-[#e2e8f0] `}
    >
      <Search className="w-4 h-4 text-gray-500" />
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className={`bg-transparent outline-none ml-2 text-sm w-full ${inputClassName}`}
      />
    </div>
  );
};

export default SearchBar;

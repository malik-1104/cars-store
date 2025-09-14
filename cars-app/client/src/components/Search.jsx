import React, { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const navigate = useNavigate();
  const timeoutId = useRef(null);

  const handleSearch = (value) => {
    timeoutId.current = setTimeout(() => {
      const updatedParams = new URLSearchParams(searchParams);
      if (value.trim() === "") {
        updatedParams.delete("search");
      } else {
        updatedParams.set("search", value);
      }
      navigate(`/cars?${updatedParams.toString()}`);
    }, 500);
  };

  const handleChange = (e) => {
    clearTimeout(timeoutId.current);
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search for cars..."
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background 
                 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground 
                 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
                 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed 
                 disabled:opacity-50 pl-10 pr-4"
    />
  );
};

export default Search;

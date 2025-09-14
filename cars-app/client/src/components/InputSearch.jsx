import React from "react";

const InputSearch = ({ value, onChange }) => {
  return (
    <div className="w-full md:w-1/3">
      <input
        type="text"
        placeholder="Search by Vehicle ID..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default InputSearch;

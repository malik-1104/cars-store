import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SidebarFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const categories = searchParams.get("category");
    return categories ? categories.split(",") : [];
  });

  const categories = [
    { id: 1, label: "Economy" },
    { id: 2, label: "Luxury" },
    { id: 3, label: "Electric" },
  ];

  const handleCategoryChange = (categoryLabel) => {
    const updatedCategories = selectedCategories.includes(categoryLabel)
      ? selectedCategories.filter((label) => label !== categoryLabel)
      : [...selectedCategories, categoryLabel];

    setSelectedCategories(updatedCategories);

    if (updatedCategories.length > 0) {
      searchParams.set("category", updatedCategories.join(","));
    } else {
      searchParams.delete("category");
    }

    setSearchParams(searchParams);
  };

  useEffect(() => {
    const categories = searchParams.get("category");
    if (categories) {
      setSelectedCategories(categories.split(","));
    }
  }, [searchParams]);

  return (
    <div className="hidden lg:block shrink-0">
      <div className="sticky top-24 bg-white p-6 rounded-lg border border-gray-200 shadow-md">
        <h3 className="font-semibold mb-4 flex items-center text-lg text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-filter mr-2 h-5 w-5 text-primary"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filters
        </h3>

        <div className="space-y-6">
          {/* Categories */}
          <div>
            <label className="text-sm font-medium mb-3 block text-gray-700">Categories</label>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={category.label}
                    checked={selectedCategories.includes(category.label)}
                    onChange={() => handleCategoryChange(category.label)}
                    className="h-4 w-4 rounded-sm border border-primary focus:ring-2 focus:ring-primary"
                  />
                  <label
                    htmlFor={category.label}
                    className="text-sm font-normal cursor-pointer text-gray-600"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200"
            onClick={() => {
              setSelectedCategories([]);
              searchParams.delete("category");
              setSearchParams(searchParams);
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;

'use client';

import { FiSearch, FiFilter } from 'react-icons/fi';

interface BlogFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  categories: string[];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (category: string) => void;
}

export function BlogFilters({ 
  searchQuery,
  selectedCategory,
  categories, 
  onSearchChange, 
  onCategoryChange 
}: BlogFiltersProps) {
  return (
    <div className="container-max px-4 mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={onSearchChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiFilter className="w-4 h-4" />
          <span>Filter by:</span>
        </div>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

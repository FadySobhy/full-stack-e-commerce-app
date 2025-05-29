import { useState, useEffect } from 'react';
import { getCategories } from '../services/api';
import type { Category } from '../types/Product';

interface FilterSidebarProps {
  onFilterChange: (filters: { category: string | null; minPrice: number; maxPrice: number }) => void;
}

export const FilterSidebar = ({ onFilterChange }: FilterSidebarProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    onFilterChange({
      category: categoryId,
      minPrice: priceRange.min,
      maxPrice: priceRange.max
    });
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const newValue = parseInt(value) || 0;
    const newPriceRange = {
      ...priceRange,
      [type]: newValue
    };
    setPriceRange(newPriceRange);
    onFilterChange({
      category: selectedCategory,
      minPrice: newPriceRange.min,
      maxPrice: newPriceRange.max
    });
  };

  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow-sm">
      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Categories</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="all-categories"
                name="category"
                checked={selectedCategory === null}
                onChange={() => handleCategoryChange(null)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <label htmlFor="all-categories" className="ml-2 text-gray-700">
                All Categories
              </label>
            </div>
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <input
                  type="radio"
                  id={`category-${category.id}`}
                  name="category"
                  checked={selectedCategory === category.id.toString()}
                  onChange={() => handleCategoryChange(category.id.toString())}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <label htmlFor={`category-${category.id}`} className="ml-2 text-gray-700">
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Price Range</h3>
          <div className="space-y-3">
            <div>
              <label htmlFor="min-price" className="block text-sm text-gray-600 mb-1">
                Min Price ($)
              </label>
              <input
                type="number"
                id="min-price"
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <label htmlFor="max-price" className="block text-sm text-gray-600 mb-1">
                Max Price ($)
              </label>
              <input
                type="number"
                id="max-price"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 
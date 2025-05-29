import { useState, useEffect } from 'react';
import type { Category } from '../types/Product';
import { getCategories } from '../services/api';

interface CategorySelectProps {
  value: number;
  onChange: (categoryId: number) => void;
  className?: string;
}

export const CategorySelect = ({ value, onChange, className = '' }: CategorySelectProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="animate-pulse h-10 bg-gray-200 rounded"></div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${className}`}
    >
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}; 
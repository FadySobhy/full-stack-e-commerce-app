import { useState } from 'react';
import type { Product } from '../types/Product';
import ProductCard from './ProductCard';
import { FilterSidebar } from './FilterSidebar';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onFilterChange: (filters: { category: string | null; minPrice: number; maxPrice: number }) => void;
}

export const ProductGrid = ({ products, onAddToCart, onFilterChange }: ProductGridProps) => {
  return (
    <div className="flex gap-6">
      <FilterSidebar onFilterChange={onFilterChange} />
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
        {products.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}; 
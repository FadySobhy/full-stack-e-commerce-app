import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import type { Product } from '../types/Product';

// Category-specific default images using UI Faces for better product-related placeholders
const CATEGORY_DEFAULTS: { [key: string]: string } = {
  electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop&q=80',
  clothing: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop&q=80',
  books: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=400&fit=crop&q=80',
  food: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=400&fit=crop&q=80',
  furniture: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400&h=400&fit=crop&q=80',
  toys: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=400&h=400&fit=crop&q=80',
  beauty: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop&q=80',
  sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop&q=80',
  home: 'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=400&h=400&fit=crop&q=80',
  garden: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&q=80',
};

// Default product image for unknown categories
const DEFAULT_PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&q=80';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const getDefaultImage = () => {
    if (product.category) {
      const normalizedCategory = product.category.name.toLowerCase().trim();
      return CATEGORY_DEFAULTS[normalizedCategory] || DEFAULT_PRODUCT_IMAGE;
    }
    return DEFAULT_PRODUCT_IMAGE;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = getDefaultImage();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl || getDefaultImage()}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={handleImageError}
        />
        {product.stockQuantity <= 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 hover:text-primary-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
            {product.category.name}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-lg font-bold text-primary-600 block">
                ${product.price.toFixed(2)}
              </span>
              <span className={`text-sm block ${product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stockQuantity > 0 ? `${product.stockQuantity} available` : 'Out of stock'}
              </span>
            </div>
            <button
              onClick={() => onAddToCart(product)}
              disabled={product.stockQuantity <= 0}
              className="inline-flex items-center justify-center h-9 px-3 border border-transparent text-sm font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-600 transition-all duration-200"
              title="Add to Cart"
            >
              <ShoppingCartIcon className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 
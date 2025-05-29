import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Product } from './types/Product';
import { ProductGrid } from './components/ProductGrid';
import { getProducts } from './services/api';
import { Categories } from './pages/Categories';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(12);
  const [filters, setFilters] = useState({
    category: null as string | null,
    minPrice: 0,
    maxPrice: 1000
  });

  useEffect(() => {
    fetchProducts();
  }, [currentPage, pageSize, filters]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts(
        currentPage,
        pageSize,
        filters.category,
        filters.minPrice,
        filters.maxPrice
      );
      setProducts(data.content);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: { category: string | null; minPrice: number; maxPrice: number }) => {
    setFilters(newFilters);
    setCurrentPage(0); // Reset to first page when filters change
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col w-screen overflow-x-hidden">
        <header className="bg-white shadow-sm sticky top-0 z-50 w-full">
          <div className="w-full">
            <nav className="flex justify-between items-center w-full px-4 md:px-8 lg:px-12 xl:px-16 py-4">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 whitespace-nowrap">E-Commerce Store</h1>
              <div className="flex items-center gap-3 md:gap-6">
                <a href="/" className="text-sm md:text-base text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
                  Home
                </a>
                <a href="/products" className="text-sm md:text-base text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
                  Products
                </a>
                <a href="/categories" className="text-sm md:text-base text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
                  Categories
                </a>
                <div className="relative">
                  <a href="/cart" className="text-sm md:text-base text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
                    Cart
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-8">
            {loading ? (
              <div className="flex justify-center items-center h-64 w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-600 p-4 w-full">
                {error}
              </div>
            ) : (
              <div className="w-full space-y-8">
                <Routes>
                  <Route path="/" element={
                    <>
                      <ProductGrid
                        products={products}
                        onAddToCart={handleAddToCart}
                        onFilterChange={handleFilterChange}
                      />
                      {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Previous
                          </button>
                          <div className="flex items-center gap-2">
                            {[...Array(totalPages)].map((_, index) => (
                              <button
                                key={index}
                                onClick={() => handlePageChange(index)}
                                className={`px-4 py-2 text-sm font-medium rounded-md ${
                                  currentPage === index
                                    ? 'bg-primary-600 text-white'
                                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                {index + 1}
                              </button>
                            ))}
                          </div>
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages - 1}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </>
                  } />
                  <Route path="/products" element={
                    <>
                      <ProductGrid
                        products={products}
                        onAddToCart={handleAddToCart}
                        onFilterChange={handleFilterChange}
                      />
                      {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Previous
                          </button>
                          <div className="flex items-center gap-2">
                            {[...Array(totalPages)].map((_, index) => (
                              <button
                                key={index}
                                onClick={() => handlePageChange(index)}
                                className={`px-4 py-2 text-sm font-medium rounded-md ${
                                  currentPage === index
                                    ? 'bg-primary-600 text-white'
                                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                {index + 1}
                              </button>
                            ))}
                          </div>
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages - 1}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </>
                  } />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/cart" element={
                    <div className="w-full space-y-4">
                      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
                      {cartItems.length === 0 ? (
                        <div className="text-center p-8 bg-white rounded-lg shadow-sm w-full">
                          <p className="text-gray-600">Your cart is empty</p>
                        </div>
                      ) : (
                        <ProductGrid
                          products={cartItems}
                          onAddToCart={handleAddToCart}
                          onFilterChange={handleFilterChange}
                        />
                      )}
                    </div>
                  } />
                </Routes>
              </div>
            )}
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App; 
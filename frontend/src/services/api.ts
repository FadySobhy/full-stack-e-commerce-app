import axios from 'axios';
import type { Product, Category } from '../types/Product';

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

const API_BASE_URL = 'http://localhost:8080/api';

interface ProductsResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export const getProducts = async (
  page: number = 0,
  size: number = 10,
  categoryId?: string | null,
  minPrice?: number,
  maxPrice?: number
): Promise<ProductsResponse> => {
  let url = `${API_BASE_URL}/products?page=${page}&size=${size}`;
  
  if (categoryId) {
    url += `&categoryId=${categoryId}`;
  }
  if (minPrice !== undefined) {
    url += `&minPrice=${minPrice}`;
  }
  if (maxPrice !== undefined) {
    url += `&maxPrice=${maxPrice}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const getProduct = async (id: number): Promise<Product> => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

// Category API functions
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/api/categories');
  return response.data;
};

export const getCategory = async (id: number): Promise<Category> => {
  const response = await api.get(`/api/categories/${id}`);
  return response.data;
};

export const createCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
  const response = await api.post('/api/categories', category);
  return response.data;
};

export const updateCategory = async (id: number, category: Omit<Category, 'id'>): Promise<Category> => {
  const response = await api.put(`/api/categories/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/api/categories/${id}`);
};

export default api; 
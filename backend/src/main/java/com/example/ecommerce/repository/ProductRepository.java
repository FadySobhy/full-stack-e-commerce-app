package com.example.ecommerce.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.model.Category;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategory(Category category, Pageable pageable);
    
    Page<Product> findByPriceBetween(Double minPrice, Double maxPrice, Pageable pageable);
    
    Page<Product> findByPriceGreaterThanEqual(Double minPrice, Pageable pageable);
    
    Page<Product> findByPriceLessThanEqual(Double maxPrice, Pageable pageable);
    
    Page<Product> findByCategoryAndPriceBetween(Category category, Double minPrice, Double maxPrice, Pageable pageable);
    
    Page<Product> findByCategoryAndPriceGreaterThanEqual(Category category, Double minPrice, Pageable pageable);
    
    Page<Product> findByCategoryAndPriceLessThanEqual(Category category, Double maxPrice, Pageable pageable);
} 
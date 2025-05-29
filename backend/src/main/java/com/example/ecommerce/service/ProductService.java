package com.example.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.model.Category;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    public Page<Product> getAllProducts(
            Pageable pageable,
            Long categoryId,
            Double minPrice,
            Double maxPrice
    ) {
        if (categoryId != null) {
            Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
            
            if (minPrice != null && maxPrice != null) {
                return productRepository.findByCategoryAndPriceBetween(category, minPrice, maxPrice, pageable);
            } else if (minPrice != null) {
                return productRepository.findByCategoryAndPriceGreaterThanEqual(category, minPrice, pageable);
            } else if (maxPrice != null) {
                return productRepository.findByCategoryAndPriceLessThanEqual(category, maxPrice, pageable);
            }
            
            return productRepository.findByCategory(category, pageable);
        }
        
        if (minPrice != null && maxPrice != null) {
            return productRepository.findByPriceBetween(minPrice, maxPrice, pageable);
        } else if (minPrice != null) {
            return productRepository.findByPriceGreaterThanEqual(minPrice, pageable);
        } else if (maxPrice != null) {
            return productRepository.findByPriceLessThanEqual(maxPrice, pageable);
        }
        
        return productRepository.findAll(pageable);
    }
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    public Product getProduct(Long id) {
        return productRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Product not found"));
    }
    
    public Product createProduct(Product product) {
        if (product.getCategory() != null && product.getCategory().getId() != null) {
            Category category = categoryRepository.findById(product.getCategory().getId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
            product.setCategory(category);
        }
        return productRepository.save(product);
    }
    
    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProduct(id);
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setImageUrl(productDetails.getImageUrl());
        
        if (productDetails.getCategory() != null && productDetails.getCategory().getId() != null) {
            Category category = categoryRepository.findById(productDetails.getCategory().getId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
            product.setCategory(category);
        }
        
        return productRepository.save(product);
    }
    
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Product not found");
        }
        productRepository.deleteById(id);
    }
} 
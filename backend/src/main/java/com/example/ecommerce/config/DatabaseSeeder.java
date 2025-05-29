package com.example.ecommerce.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.example.ecommerce.model.Category;
import com.example.ecommerce.repository.CategoryRepository;
import jakarta.transaction.Transactional;

import java.util.Arrays;
import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    @Transactional
    public void run(String... args) {
        // List of default categories
        List<String> categoryNames = Arrays.asList(
            "electronics",
            "clothing",
            "books",
            "food",
            "furniture",
            "toys",
            "beauty",
            "sports",
            "home",
            "garden"
        );

        // Seed categories if they don't exist
        for (String name : categoryNames) {
            if (!categoryRepository.existsByName(name)) {
                Category category = new Category();
                category.setName(name);
                categoryRepository.save(category);
            }
        }
    }
} 
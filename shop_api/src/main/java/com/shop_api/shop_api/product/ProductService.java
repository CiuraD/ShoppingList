package com.shop_api.shop_api.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @PostConstruct
    public void testConnection() {
        Product product = new Product();
        product.setName("Test Product");
        product.setPrice(10.0);

        productRepository.save(product);

        System.out.println("Product saved successfully: " + productRepository.findAll());
    }
}
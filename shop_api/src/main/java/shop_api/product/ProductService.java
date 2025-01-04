package shop_api.product;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);


    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(String id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    public List<Product> getProductsByProductListId(String productListId) {
        return productRepository.findByProductListId(productListId);
    }

    public void uploadImage(String productId, String imageString) {
        Product product = productRepository.findById(productId).orElse(null);
        if (product != null) {
            product.setImageString(imageString);
            productRepository.save(product);
        }
    }

    public String getImage(String productId) {
        Product product = productRepository.findById(productId).orElse(null);
        if (product != null) {
            return product.getImageString();
        }
        return "";
    }

    public void deleteImage(String productId) {
        logger.info("Deleting image for product with id: " + productId);
        Product product = productRepository.findById(productId).orElse(null);
        if (product != null) {
            product.setImageString("");
            productRepository.save(product);
        }
    }
}
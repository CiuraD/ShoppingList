package shop_api.product;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import shop_api.services.ImageService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ImageService imageService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable String id, @RequestBody Product product) {
        return productService.saveProduct(product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
    }

    @PostMapping("/{id}/image")
    public String uploadImage(@PathVariable String id, @RequestParam("file") MultipartFile file) throws IOException {
        String imageId = imageService.storeImage(file);
        Product product = productService.getProductById(id);
        product.setImageId(imageId);
        productService.saveProduct(product);
        return imageId;
    }

    @GetMapping("/{id}/image")
    public byte[] getImage(@PathVariable String id) throws IOException {
        Product product = productService.getProductById(id);
        return imageService.getImage(product.getImageId());
    }

    @GetMapping("/productList/{productListId}")
    public List<Product> getProductsByProductListId(@PathVariable String productListId) {
        return productService.getProductsByProductListId(productListId);
    }
}
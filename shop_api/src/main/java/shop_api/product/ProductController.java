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
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

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

    @PutMapping("/image/{productId}")
    public void uploadImage(@PathVariable String productId, @RequestBody String imgageString) throws IOException {
       productService.uploadImage(productId, imgageString);
    }

    @GetMapping("image/{productId}")
    public String getImage(@PathVariable String productId) throws IOException {
        return productService.getImage(productId);
    }

    @DeleteMapping("/image/{productId}")
    public void deleteImage(@PathVariable String productId) {
        productService.deleteImage(productId);
    }

    @GetMapping("/productList/{productListId}")
    public List<Product> getProductsByProductListId(@PathVariable String productListId) {
        return productService.getProductsByProductListId(productListId);
    }
}
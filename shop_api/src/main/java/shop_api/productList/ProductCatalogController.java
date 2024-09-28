package shop_api.productList;

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
@RequestMapping("/api/productCatalogs")
public class ProductCatalogController {

    @Autowired
    private ProductCatalogService productCatalogService;

    @GetMapping
    public List<ProductCatalog> getAllProductCatalogs() {
        return productCatalogService.getAllProductCatalogs();
    }

    @GetMapping("/{id}")
    public ProductCatalog getProductCatalogById(@PathVariable String id) {
        return productCatalogService.getProductCatalogById(id);
    }

    @PostMapping
    public ProductCatalog createProductCatalog(@RequestBody ProductCatalog productCatalog) {
        return productCatalogService.saveProductCatalog(productCatalog);
    }

    @PutMapping("/{id}")
    public ProductCatalog updateProductCatalog(@PathVariable String id, @RequestBody ProductCatalog productCatalog) {
        productCatalog.setId(id);
        return productCatalogService.saveProductCatalog(productCatalog);
    }

    @DeleteMapping("/{id}")
    public void deleteProductCatalog(@PathVariable String id) {
        productCatalogService.deleteProductCatalog(id);
    }
}
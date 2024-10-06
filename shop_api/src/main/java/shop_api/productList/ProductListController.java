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
public class ProductListController {

    @Autowired
    private ProductListService productCatalogService;

    @GetMapping
    public List<ProductList> getAllProductCatalogs() {
        return productCatalogService.getAllProductCatalogs();
    }

    @GetMapping("/{id}")
    public ProductList getProductCatalogById(@PathVariable String id) {
        return productCatalogService.getProductCatalogById(id);
    }

    @PostMapping
    public ProductList createProductCatalog(@RequestBody ProductList productCatalog) {
        return productCatalogService.saveProductCatalog(productCatalog);
    }

    @PutMapping("/{id}")
    public ProductList updateProductCatalog(@PathVariable String id, @RequestBody ProductList productCatalog) {
        productCatalog.setId(id);
        return productCatalogService.saveProductCatalog(productCatalog);
    }

    @DeleteMapping("/{id}")
    public void deleteProductCatalog(@PathVariable String id) {
        productCatalogService.deleteProductCatalog(id);
    }
}
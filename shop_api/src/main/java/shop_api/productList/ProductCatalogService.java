package shop_api.productList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductCatalogService {

    @Autowired
    private ProductCatalogRepository productCatalogRepository;

    public List<ProductCatalog> getAllProductCatalogs() {
        return productCatalogRepository.findAll();
    }

    public ProductCatalog getProductCatalogById(String id) {
        return productCatalogRepository.findById(id).orElse(null);
    }

    public ProductCatalog saveProductCatalog(ProductCatalog productCatalog) {
        return productCatalogRepository.save(productCatalog);
    }

    public void deleteProductCatalog(String id) {
        productCatalogRepository.deleteById(id);
    }
}
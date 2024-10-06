package shop_api.productList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductListService {

    @Autowired
    private ProductListRepository productCatalogRepository;

    public List<ProductList> getAllProductCatalogs() {
        return productCatalogRepository.findAll();
    }

    public ProductList getProductCatalogById(String id) {
        return productCatalogRepository.findById(id).orElse(null);
    }

    public ProductList saveProductCatalog(ProductList productCatalog) {
        return productCatalogRepository.save(productCatalog);
    }

    public void deleteProductCatalog(String id) {
        productCatalogRepository.deleteById(id);
    }
}
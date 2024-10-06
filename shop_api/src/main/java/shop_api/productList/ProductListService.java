package shop_api.productList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductListService {

    @Autowired
    private ProductListRepository roductListRepository;

    public List<ProductList> getAllProductLists() {
        return roductListRepository.findAll();
    }

    public ProductList getProductListById(String id) {
        return roductListRepository.findById(id).orElse(null);
    }

    public ProductList saveProductList(ProductList productList) {
        return roductListRepository.save(productList);
    }

    public void deleteProductList(String id) {
        roductListRepository.deleteById(id);
    }
}
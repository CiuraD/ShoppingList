package shop_api.productList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/productLists")
public class ProductListController {

    @Autowired
    private ProductListService productListService;

    @GetMapping
    public List<ProductList> getAllProductLists() {
        return productListService.getAllProductLists();
    }

    @GetMapping("/{id}")
    public ProductList getProductListById(@PathVariable String id) {
        return productListService.getProductListById(id);
    }

    @GetMapping("/latest/{username}")
    public ProductList getLastUpdtadeProductListForUser(@PathVariable String username) {
        return productListService.getLastUpdtadeProductListForUser(username);
    }

    @PostMapping
    public ProductList createProductList(@RequestBody ProductList productList) {
        return productListService.saveProductList(productList);
    }

    @PutMapping("/{id}")
    public ProductList updateProductList(@PathVariable String id, @RequestBody ProductList productList) {
        productList.setId(id);
        return productListService.saveProductList(productList);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProductList(@PathVariable String id) {
        productListService.deleteProductList(id);
    }

    @PutMapping("/shareListWithGroup/{productListId}")
    public ResponseEntity<String> shareListWithGroup(@PathVariable String productListId, @RequestBody String groupId) {
        return productListService.shareListWithGroup(productListId, groupId);
    }

    @PutMapping("/unshareListWithGroup/{productListId}")
    public ResponseEntity<String> unshareListWithGroup(@PathVariable String productListId) {
        return productListService.unshareListWithGroup(productListId);
    }
}
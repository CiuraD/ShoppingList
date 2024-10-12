package shop_api.productList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import shop_api.product.ProductRepository;
import shop_api.userGroup.UserGroup;
import shop_api.userGroup.UserGroupRepository;

@Service
public class ProductListService {

    @Autowired
    private ProductListRepository roductListRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserGroupRepository userGroupRepository;

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
        productRepository.deleteAllByProductListId(id);
        roductListRepository.deleteById(id);
    }

    public ResponseEntity<String> shareListWithGroup(String productListId, String groupId) {
        ProductList productList = roductListRepository.findById(productListId).orElse(null);
        if (productList != null) {
            UserGroup userGroup = userGroupRepository.findById(groupId).orElse(null);
            if (userGroup != null) {
                userGroup.addProductList(productListId);
                userGroupRepository.save(userGroup);

                productList.setUserGroupId(groupId);
                roductListRepository.save(productList);
                return ResponseEntity.ok().body("Product list shared with group");
            }
            return ResponseEntity.status(404).body("Group not found");
        }
        return ResponseEntity.status(404).body("Product list not found");
    }

    public ResponseEntity<String> unshareListWithGroup(String productListId) {
        ProductList productList = roductListRepository.findById(productListId).orElse(null);
        if (productList != null) {
            UserGroup userGroup = userGroupRepository.findById(productList.getUserGroupId()).orElse(null);
            if (userGroup != null) {
                userGroup.removeProductList(productListId);
                userGroupRepository.save(userGroup);

                productList.setUserGroupId(null);
                roductListRepository.save(productList);
                return ResponseEntity.ok().body("Product list unshared with group");
            }
            return ResponseEntity.status(404).body("Group not found");
        }
        return ResponseEntity.status(404).body("Product list not found");
    }
}
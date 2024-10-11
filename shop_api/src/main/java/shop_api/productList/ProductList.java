package shop_api.productList;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "product_lists")
public class ProductList {
    @Id
    private String id;
    private String name;
    private List<String> productsId;
    private String userGroupId;
    private String userId;

    // Constructors
    public ProductList() {}

    public ProductList(String name, List<String> productsId, String userGroupId, String userId) {
        if (userId == null || userId.isEmpty()) {
            throw new IllegalArgumentException("userId cannot be null or empty");
        }
        this.name = name;
        this.productsId = productsId;
        this.userGroupId = userGroupId;
        this.userId = userId;
    }

    public void removeUserGroupId() {
        this.userGroupId = null;
    }

    public String getId() {
        return id;
    }
    
    public List<String> getProductsId() {
        return productsId;
    }

    public String getName() {
        return name;
    }

    public String getUserGroupId() {
        return userGroupId;
    }

    public String getUserId() {
        return userId;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setProductsId(List<String> productsId) {
        this.productsId = productsId;
    }

    public void setUserGroupId(String userGroupId) {
        this.userGroupId = userGroupId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
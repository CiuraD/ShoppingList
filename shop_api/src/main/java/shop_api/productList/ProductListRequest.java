package shop_api.productList;

import java.util.List;

import com.mongodb.lang.Nullable;

import shop_api.product.ProductRequest;

public class ProductListRequest {
    @Nullable
    private String id;
    
    private String name;
    private List<ProductRequest> products;
    private String userGroupId;
    private String userName;

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ProductRequest> getProducts() {
        return products;
    }

    public void setProducts(List<ProductRequest> products) {
        this.products = products;
    }

    public String getUserGroupId() {
        return userGroupId;
    }

    public void setUserGroupId(String userGroupId) {
        this.userGroupId = userGroupId;
    }

    public String getUserName() {
        return userName;
    }

    public void setuUerName(String userName) {
        this.userName = userName;
    }
}
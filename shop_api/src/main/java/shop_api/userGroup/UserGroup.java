package shop_api.userGroup;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import shop_api.productList.ProductCatalog;
import shop_api.user.User;

@Document(collection = "user_groups")
public class UserGroup {
    @Id
    private String id;
    private String name;
    private List<User> users;
    private List<ProductCatalog> productCatalogs;

    // Constructors
    public UserGroup() {}

    public UserGroup(String name, List<User> users, List<ProductCatalog> productCatalogs) {
        this.name = name;
        this.users = users;
        this.productCatalogs = productCatalogs;
    }

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

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<ProductCatalog> getProductCatalogs() {
        return productCatalogs;
    }

    public void setProductCatalogs(List<ProductCatalog> productCatalogs) {
        this.productCatalogs = productCatalogs;
    }
}
package shop_api.userGroup;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import shop_api.user.User;

@Document(collection = "user_groups")
public class UserGroup {
    @Id
    private String id;
    private String name;
    private List<User> users;
    private List<String> productListsId;

    // Constructors
    public UserGroup() {}

    public UserGroup(String name, List<User> users, List<String> productListsId) {
        this.name = name;
        this.users = users;
        this.productListsId = productListsId;
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

    public List<String> getProductListsId() {
        return productListsId;
    }

    public void setProductListsId(List<String> productListsId) {
        this.productListsId = productListsId;
    }
}
package shop_api.userGroup;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user_groups")
public class UserGroup {
    @Id
    private String id;
    private String name;
    private String creatorName;
    private List<String> usersIds;
    private List<String> productListsId;

    // Constructors
    public UserGroup() {}

    public UserGroup(String name, String userId, String creatorName) {
        this.name = name;
        this.usersIds = new ArrayList<>();
        this.productListsId = new ArrayList<>();
        this.usersIds.add(userId);
        this.creatorName = creatorName;
    }

    public void addUser(String userId) {
        this.usersIds.add(userId);
    }

    public void addProductList(String productListId) {
        this.productListsId.add(productListId);
    }

    public void removeUser(String userId) {
        this.usersIds.remove(userId);
    }

    public void removeProductList(String productListId) {
        this.productListsId.remove(productListId);
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

    public String getCreatorName() {
        return creatorName;
    }

    public List<String> getUsers() {
        return usersIds;
    }

    public void setUsers(List<String> usersIds) {
        this.usersIds = usersIds;
    }

    public List<String> getProductListsId() {
        return productListsId;
    }

    public void setProductListsId(List<String> productListsId) {
        this.productListsId = productListsId;
    }
}
package shop_api.userGroup;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user_groups")
public class UserGroup {
    @Id
    private String id;
    private String name;
    private List<String> usersIds;
    private List<String> productListsId;

    // Constructors
    public UserGroup() {}

    public UserGroup(String name, String userId) {
        this.name = name;
        this.usersIds.add(userId);
    }

    public void addUser(String userId) {
        this.usersIds.add(userId);
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
package shop_api.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;

    @Indexed(unique = true)
    private String username;
    
    private String password;
    private String email;
    private List<String> userGroupId;
    private List<String> productListsId;

    public User() {
        this.userGroupId = new ArrayList<>();
        this.productListsId = new ArrayList<>();
    }

    public void addUserGroup(String userGroupId) {
        this.userGroupId.add(userGroupId);
    }

    public void removeUserGroup(String userGroupId) {
        this.userGroupId.remove(userGroupId);
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public List<String> getUserGroupId() {
        return userGroupId;
    }

    public List<String> getProductListsId() {
        return productListsId;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUserGroupId(List<String> userGroupId) {
        this.userGroupId = userGroupId;
    }

    public void setProductListsId(List<String> productListsId) {
        this.productListsId = productListsId;
    }
}

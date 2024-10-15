package shop_api.userGroup;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "join_codes")
public class JoinCode {
    @Id
    private String id;
    private String userGroupId;
    private String creatorUserId;
    private String code;

    public JoinCode(String userGroupId, String creatorUserId, String code) {
        this.userGroupId = userGroupId;
        this.creatorUserId = creatorUserId;
        this.code = code;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserGroupId() {
        return userGroupId;
    }

    public void setUserGroupId(String userGroupId) {
        this.userGroupId = userGroupId;
    }

    public String getCreatorUserId() {
        return creatorUserId;
    }

    public void setCreatorUserId(String creatorUserId) {
        this.creatorUserId = creatorUserId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public String toString() {
        return "JoinCode{" +
                "userGroupId='" + userGroupId + '\'' +
                ", creatorUserId='" + creatorUserId + '\'' +
                ", code='" + code + '\'' +
                '}';
    }
    
}

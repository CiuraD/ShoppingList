package shop_api.userGroup;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "join_codes")
public class JoinCode {
    @Id
    private String id;
    private String userGroupId;
    private String creatorUserId;
    private String code;

    @Autowired
    private JoinCodeRepository joinCodeRepository;

    public JoinCode(String userGroupId, String creatorUserId) {
        this.userGroupId = userGroupId;
        this.creatorUserId = creatorUserId;
        this.code = generateUniqueCode();
    }

    private String generateUniqueCode() {
        String code;
        do {
            code = generateCode();
        } while (joinCodeRepository.existsByCode(code));
        return code;
    }

    private String generateCode() {
        int length = 10;
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder codeBuilder = new StringBuilder(length);
        java.util.Random random = new java.util.Random();
        for (int i = 0; i < length; i++) {
            codeBuilder.append(characters.charAt(random.nextInt(characters.length())));
        }
        return codeBuilder.toString();
        }

        String getId() {
        return id;
    }

    void setId(String id) {
        this.id = id;
    }

    String getUserGroupId() {
        return userGroupId;
    }

    void setUserGroupId(String userGroupId) {
        this.userGroupId = userGroupId;
    }

    String getCreatorUserId() {
        return creatorUserId;
    }

    void setCreatorUserId(String creatorUserId) {
        this.creatorUserId = creatorUserId;
    }

    String getCode() {
        return code;
    }

    void setCode(String code) {
        this.code = code;
    }
}

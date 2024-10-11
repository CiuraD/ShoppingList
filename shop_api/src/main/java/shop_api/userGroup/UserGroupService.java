package shop_api.userGroup;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import shop_api.productList.ProductList;
import shop_api.productList.ProductListRepository;
import shop_api.user.User;
import shop_api.user.UserRepository;

@Service
public class UserGroupService {

        private static final Logger logger = LoggerFactory.getLogger(UserGroupService.class);


    @Autowired
    private UserGroupRepository userGroupRepository;

    @Autowired
    private JoinCodeRepository joinCodeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductListRepository productListRepository;

    public List<UserGroup> getAllUserGroups() {
        return userGroupRepository.findAll();
    }

    public UserGroup getUserGroupById(String id) {
        return userGroupRepository.findById(id).orElse(null);
    }

    public ResponseEntity<Void> createUserGroup(String userGroupName, String userName) {
        Optional<User> user = userRepository.findByUsername(userName);
        if (user.isPresent()) {
            User userObj = user.get();
            UserGroup userGroup = new UserGroup(userGroupName, userObj.getId(), userObj.getUsername());

            userObj.addUserGroup(userGroup.getId());

            userGroupRepository.save(userGroup);
            userRepository.save(userObj);
            
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    public void deleteUserGroup(String id) {
        Optional<UserGroup> userGroup = userGroupRepository.findById(id);
        if (userGroup.isPresent()) {
            UserGroup group = userGroup.get();
            for (String userId : group.getUsers()) {
                Optional<User> user = userRepository.findById(userId);
                if (user.isPresent()) {
                    User userObj = user.get();
                    List<ProductList> productLists = productListRepository.findAllById(group.getProductListsId());

                    for (ProductList list : productLists) {
                        list.removeUserGroupId();
                        productListRepository.save(list);
                    }

                    userObj.removeUserGroup(group.getId());
                    userRepository.save(userObj);
                    userGroupRepository.deleteById(id);
                }
            }
        }
    }

    public JoinCode createJoinCode(String creatorUserName, String groupId) {
        Optional<User> user = userRepository.findByUsername(creatorUserName);
        if (!user.isPresent()) {
            return null;
        }
        String code = generateUniqueCode();
        JoinCode joinCode = new JoinCode(groupId, user.get().getId(), code);
        joinCodeRepository.save(joinCode);
        logger.debug("Join code created with code: " + joinCode.getCode());
        return joinCode;
    }

    public List<JoinCode> getJoinCodesByUser(String userName) {
        logger.info("userName - {}", userName);
        Optional<User> user = userRepository.findByUsername(userName);
        if (user.isPresent()) {
            List<JoinCode> joinCodes = joinCodeRepository.findAllByCreatorUserId(user.get().getId());
            return !joinCodes.isEmpty() ? joinCodes : Collections.emptyList();
        } else {
            return Collections.emptyList();
        }
    }

    public ResponseEntity<String> joinGroup(String joinCode, String userName) {
        logger.info("Joining group with code: " + joinCode);
        Optional<JoinCode> joinCodeOptional = joinCodeRepository.findByCode(joinCode);

        if (!joinCodeOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Join code not correct: " + joinCode);
        }
        JoinCode joinCodeObj = joinCodeOptional.get();
        Optional<User> user = userRepository.findByUsername(userName);
        if (user.isPresent()) {
            User userObj = user.get();
            Optional<UserGroup> group = userGroupRepository.findById(joinCodeObj.getUserGroupId());

            if (group.isPresent()) {
                UserGroup groupObj = group.get();

                groupObj.addUser(userObj.getId());
                userObj.addUserGroup(groupObj.getId());

                userRepository.save(userObj);
                userGroupRepository.save(groupObj);

                return ResponseEntity.status(HttpStatus.OK).body("User joined group");
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Group not found");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");     
    }

    public List<Map<String, String>> getAllUserGroupsForUser(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return userGroupRepository.findAllByUsersIdsContaining(user.get().getId())
                    .stream()
                    .map(userGroup -> Map.of("id", userGroup.getId(), "name", userGroup.getName(), "creatorName", userGroup.getCreatorName()))
                    .collect(Collectors.toList());
        }
        return null;
    }

    public ResponseEntity<Void> updateUserGroup(String id, String userGroupName) {
        Optional<UserGroup> userGroup = userGroupRepository.findById(id);
        if (userGroup.isPresent()) {
            UserGroup group = userGroup.get();
            group.setName(userGroupName);
            userGroupRepository.save(group);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Void> leaveGroup(String userName, String groupId) {
        Optional<User> user = userRepository.findByUsername(userName);
        if (user.isPresent()) {
            User userObj = user.get();
            Optional<UserGroup> group = userGroupRepository.findById(groupId);
            if (group.isPresent()) {
                UserGroup groupObj = group.get();
                groupObj.removeUser(userObj.getId());
                userObj.removeUserGroup(groupObj.getId());
                userGroupRepository.save(groupObj);
                userRepository.save(userObj);
                return ResponseEntity.ok().build();
            }
        }
        return ResponseEntity.notFound().build();
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
}
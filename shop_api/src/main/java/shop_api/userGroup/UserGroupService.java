package shop_api.userGroup;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
            UserGroup userGroup = new UserGroup(userGroupName, userObj.getId());

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
        JoinCode joinCode = new JoinCode(groupId, user.get().getId());
        joinCodeRepository.save(joinCode);
        return joinCode;
    }

    public List<JoinCode> getJoinCodesByUser(String userName) {
        Optional<User> user = userRepository.findByUsername(userName);
        if (user.isPresent()) {
            return joinCodeRepository.findAllByCreatorUserId(user.get().getId());
        } else {
            return null;
        }
    }

    public ResponseEntity<String> joinGroup(JoinCode joinCode, String userName) {
        JoinCode joinCodeObj = joinCodeRepository.findById(joinCode.getId()).orElse(null);

        if (joinCodeObj == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Join code not correct");
        }

        Optional<User> user = userRepository.findByUsername(userName);
        if (user.isPresent()) {
            User userObj = user.get();
            Optional<UserGroup> group = userGroupRepository.findById(joinCode.getUserGroupId());

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
                    .map(userGroup -> Map.of("id", userGroup.getId(), "name", userGroup.getName()))
                    .collect(Collectors.toList());
        }
        return null;
    }
}
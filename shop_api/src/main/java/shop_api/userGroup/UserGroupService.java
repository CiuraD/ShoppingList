package shop_api.userGroup;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

    public JoinCode createJoinCode(String creatorUserId, String groupId) {
        JoinCode joinCode = new JoinCode(groupId, creatorUserId);
        joinCodeRepository.save(joinCode);
        return joinCode;
    }

    public List<JoinCode> getJoinCodesByUser(String userId) {
        return joinCodeRepository.findAllByCreatorUserId(userId);
    }

    public ResponseEntity<Void> joinGroup(String joinCode, String userId) {
        Optional<JoinCode> code = joinCodeRepository.findByCode(joinCode);
        if (code.isPresent()) {

            Optional<User> user = userRepository.findByUsername(userId);

            if (user.isPresent()) {

                User userObj = user.get();
                JoinCode codeObj = code.get();

                Optional<UserGroup> group = userGroupRepository.findById(codeObj.getUserGroupId());

                if (group.isPresent()) {
                    UserGroup groupObj = group.get();

                    groupObj.addUser(userObj.getId());
                    userObj.addUserGroup(groupObj.getId());

                    userRepository.save(userObj);
                    userGroupRepository.save(groupObj);

                    return ResponseEntity.ok().build();
                } else {
                    return ResponseEntity.notFound().build();
                }
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
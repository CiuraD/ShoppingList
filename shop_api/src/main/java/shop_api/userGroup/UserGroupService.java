package shop_api.userGroup;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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

    public List<UserGroup> getAllUserGroups() {
        return userGroupRepository.findAll();
    }

    public UserGroup getUserGroupById(String id) {
        return userGroupRepository.findById(id).orElse(null);
    }

    public UserGroup saveUserGroup(UserGroup userGroup) {
        return userGroupRepository.save(userGroup);
    }

    public void deleteUserGroup(String id) {
        userGroupRepository.deleteById(id);
    }

    public JoinCode createJoinCode(String creatorUserId, String groupId) {
        JoinCode joinCode = new JoinCode(groupId, creatorUserId);
        joinCodeRepository.save(joinCode);
        return joinCode;
    }

    public List<JoinCode> getJoinCodesByUser(String userId) {
        return joinCodeRepository.findAllByCreatorUserId(userId);
    }

    public ResponseEntity joinGroup(String joinCode, String userId) {
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
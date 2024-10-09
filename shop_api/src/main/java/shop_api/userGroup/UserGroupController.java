package shop_api.userGroup;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/userGroups")
public class UserGroupController {

    private static final Logger logger = LoggerFactory.getLogger(UserGroupController.class);

    @Autowired
    private UserGroupService userGroupService;

    @PostMapping("/create")
    public ResponseEntity<Void> createUserGroup(@RequestBody Map<String, String> request) {
        String groupName = request.get("groupName");
        String userName = request.get("userName");
        logger.debug("Creating user group with name: " + groupName);
        return userGroupService.createUserGroup(groupName, userName);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUserGroup(@PathVariable String id) {
        userGroupService.deleteUserGroup(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Void> updateUserGroup(@PathVariable String id, @RequestBody String userGroupName) {
        return userGroupService.updateUserGroup(id, userGroupName);
    }

    @PutMapping("leave/{userName}")
    public ResponseEntity<Void> putMethodName(@PathVariable String userName, @RequestBody String gruopId) {
        return userGroupService.leaveGroup(userName, gruopId);
    }

    @GetMapping("/getAllForUser/{userName}")
    public List<Map<String, String>> getAllUserGroupsForUser(@PathVariable String userName) {
        return userGroupService.getAllUserGroupsForUser(userName);
    }

    @PostMapping("/code/create")
    public JoinCode createJoinCode(@RequestBody Map<String, String> request) {
        String groupId = request.get("userGroupId");
        String creatorUserName = request.get("userName");

        logger.debug("Creating join code for group with id: " + groupId);
        
        return userGroupService.createJoinCode(creatorUserName, groupId);
    }

    // Get all codes for groups that the user is a member of
    @GetMapping("/code/getByUser/{userName}")
    public List<JoinCode> getJoinCodesByUser(@PathVariable String userName) {
        
        List<JoinCode> joinCodes = userGroupService.getJoinCodesByUser(userName);
        joinCodes.forEach(code -> logger.info("JoinCode: " + code.getUserGroupId() + " - " + code.getCreatorUserId() + " - " + code.getCode()));
        logger.info("Returning join codes: " + joinCodes);
        return joinCodes;
    }

    @PutMapping("/code/join/{userName}")
    public ResponseEntity<String> joinGroup(@RequestBody String code, @PathVariable String userName) {
        logger.debug("Joining group with code: " + code);
        return userGroupService.joinGroup(code, userName);
    }
}
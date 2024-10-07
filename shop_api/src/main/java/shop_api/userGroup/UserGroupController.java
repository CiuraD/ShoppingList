package shop_api.userGroup;

import java.util.List;
import java.util.Map;

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

    @Autowired
    private UserGroupService userGroupService;

    @PostMapping("/create")
    public ResponseEntity<Void> createUserGroup(@RequestBody String userGroupName, @RequestBody String userName) {
        return userGroupService.createUserGroup(userGroupName, userName);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUserGroup(@PathVariable String id) {
        userGroupService.deleteUserGroup(id);
    }

    @GetMapping("/getAllForUser/{userName}")
    public List<Map<String, String>> getAllUserGroupsForUser(@PathVariable String userName) {
        return userGroupService.getAllUserGroupsForUser(userName);
    }

    @PostMapping("/code/create")
    public JoinCode createJoinCode(@RequestBody String creatorUserName, @RequestBody String groupId) {
        return userGroupService.createJoinCode(creatorUserName, groupId);
    }

    // Get all codes for gruops that the user is a member of
    @GetMapping("/code/getByUser/{userName}")
    public List<JoinCode> getJoinCodesByUser(@PathVariable String userName) {
        return userGroupService.getJoinCodesByUser(userName);
    }

    @PutMapping("/code/join/{userName}")
    public ResponseEntity<String> joinGroup(@RequestBody JoinCode code, @PathVariable String userName) {
        return userGroupService.joinGroup(code, userName);
    }
}
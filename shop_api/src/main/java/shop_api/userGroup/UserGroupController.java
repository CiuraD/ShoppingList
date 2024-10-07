package shop_api.userGroup;

import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/userGroups")
public class UserGroupController {

    @Autowired
    private UserGroupService userGroupService;

    //TODO REMOUVE
    @GetMapping
    public List<UserGroup> getAllUserGroups() {
        return userGroupService.getAllUserGroups();
    }

    //TODO REMOUVE
    @GetMapping("/{id}")
    public UserGroup getUserGroupById(@PathVariable String id) {
        return userGroupService.getUserGroupById(id);
    }

    //TODO CHANGE IT
    @PostMapping
    public UserGroup createUserGroup(@RequestBody UserGroup userGroup) {
        return userGroupService.saveUserGroup(userGroup);
    }

    //TODO CHANGE IT
    @DeleteMapping("/{id}")
    public void deleteUserGroup(@PathVariable String id) {
        userGroupService.deleteUserGroup(id);
    }

    @PostMapping("/code/create/{creatorUserId}/{groupId}")
    public JoinCode createJoinCode(@PathVariable String creatorUserId, @PathVariable String groupId) {
        return userGroupService.createJoinCode(creatorUserId, groupId);
    }

    @GetMapping("/code/getByUser/{userId}")
    public List<JoinCode> getJoinCodesByUser(@PathVariable String userId) {
        return userGroupService.getJoinCodesByUser(userId);
    }

    @GetMapping("/code/authenticate/{code}/{userName}")
    public ResponseEntity joinGroup(@RequestParam String code, @RequestParam String userName) {
        return userGroupService.joinGroup(code, userName);
    }
    
}
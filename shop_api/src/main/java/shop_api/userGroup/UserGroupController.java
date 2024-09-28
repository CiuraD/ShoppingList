package shop_api.userGroup;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping
    public List<UserGroup> getAllUserGroups() {
        return userGroupService.getAllUserGroups();
    }

    @GetMapping("/{id}")
    public UserGroup getUserGroupById(@PathVariable String id) {
        return userGroupService.getUserGroupById(id);
    }

    @PostMapping
    public UserGroup createUserGroup(@RequestBody UserGroup userGroup) {
        return userGroupService.saveUserGroup(userGroup);
    }

    @PutMapping("/{id}")
    public UserGroup updateUserGroup(@PathVariable String id, @RequestBody UserGroup userGroup) {
        userGroup.setId(id);
        return userGroupService.saveUserGroup(userGroup);
    }

    @DeleteMapping("/{id}")
    public void deleteUserGroup(@PathVariable String id) {
        userGroupService.deleteUserGroup(id);
    }
}
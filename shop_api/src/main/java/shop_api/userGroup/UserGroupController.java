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

    @PostMapping("/create")
    public ResponseEntity<Void> createUserGroup(@RequestBody String userGroupName, @RequestBody String userName) {
        return userGroupService.createUserGroup(userGroupName, userName);
    }

    @DeleteMapping("/delete/{id}")
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

    @GetMapping("/code/join/{code}/{userName}")
    public ResponseEntity<Void> joinGroup(@RequestParam String code, @RequestParam String userName) {
        return userGroupService.joinGroup(code, userName);
    }
    
}
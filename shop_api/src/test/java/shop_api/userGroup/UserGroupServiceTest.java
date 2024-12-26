package shop_api.userGroup;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import shop_api.user.User;
import shop_api.user.UserRepository;

@SpringBootTest
@ActiveProfiles("test") 
public class UserGroupServiceTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserGroupRepository userGroupRepository;

    @Autowired
    private JoinCodeRepository joinCodeRepository;

    @Autowired
    private UserGroupService userGroupService;

    private User mockUser;
    private User mockUser2;
    private User mockUser3;

    private UserGroup mockUserGroup;

    private final String mockUserId = "mockIDForUser";
    private final String mockUserName = "username";
    private final String mockUserPassword = "password";
    private final String mockUserEmail = "email";
    private final String mockUserGroupName = "groupName";

    @BeforeEach
    void setUp() {
        userGroupRepository.deleteAll();
        joinCodeRepository.deleteAll();
        userRepository.deleteAll();

        mockUser = new User();
        mockUser.setId(mockUserId);
        mockUser.setUsername(mockUserName);
        mockUser.setPassword(mockUserPassword);
        mockUser.setEmail(mockUserEmail);

        mockUser2 = new User();
        mockUser2.setId(mockUserId + "2");
        mockUser2.setUsername(mockUserName + "2");
        mockUser2.setPassword(mockUserPassword + "2");
        mockUser2.setEmail(mockUserEmail + "2");

        mockUser3 = new User();
        mockUser3.setId(mockUserId + "3");
        mockUser3.setUsername(mockUserName + "3");
        mockUser3.setPassword(mockUserPassword + "3");
        mockUser3.setEmail(mockUserEmail + "3");

        mockUserGroup = new UserGroup(mockUserGroupName, mockUser.getId(), mockUser.getUsername());

        mockUser3.addUserGroup(mockUserGroup.getId());
        mockUserGroup.addUser(mockUser3.getId());

        userRepository.save(mockUser);
        userRepository.save(mockUser2);
        userRepository.save(mockUser3);

        userGroupRepository.save(mockUserGroup);
    }

    @Test
    void shouldCreateUserGroup() {
        // given
        String groupName = mockUserGroupName;
        String userName = mockUser.getUsername();

        // when
        ResponseEntity<Void> response = userGroupService.createUserGroup(groupName, userName);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    void shouldCreateJoinCode() {
        // given
        String groupId = mockUserGroup.getId();
        String creatorUserName = mockUser.getUsername();

        // when
        JoinCode joinCode = userGroupService.createJoinCode(creatorUserName, groupId);

        // then
        assertThat(joinCode).isNotNull();
    }

    @Test
    void shouldGetAllUserGroupsForUser() {
        // given
        String userName = mockUser.getUsername();

        // when
        userGroupService.createUserGroup("group1", userName);
        userGroupService.createUserGroup("group2", userName);
        userGroupService.createUserGroup("group3", userName);

        // then
        assertThat(userGroupService.getAllUserGroupsForUser(userName)).hasSize(4);
    }

    @Test
    void shouldJoinGroup() {
        // given
        String userName = mockUser2.getUsername();
        String groupId = mockUserGroup.getId();

        // when
        userGroupService.createUserGroup("group1", userName);
        userGroupService.createUserGroup("group2", userName);
        userGroupService.createUserGroup("group3", userName);

        // then
        assertThat(userGroupService.getAllUserGroupsForUser(userName)).hasSize(3);

        // when
        JoinCode joinCode = userGroupService.createJoinCode(mockUser.getUsername(), groupId);
        userGroupService.joinGroup(joinCode.getCode(), userName);

        // then
        assertThat(userGroupService.getAllUserGroupsForUser(userName)).hasSize(4);
    }

    @Test
    void updateUserGroupName() {
        // given
        String newGroupName = "newGroupName";

        // when
        ResponseEntity<Void> response = userGroupService.updateUserGroup(mockUserGroup.getId(), newGroupName);

        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    void shouldLeaveGroup() {
        // given
        String userName = mockUser3.getUsername();
        String groupId = mockUserGroup.getId();

        // when
        userGroupService.createUserGroup("group1", userName);
        userGroupService.createUserGroup("group2", userName);
        userGroupService.createUserGroup("group3", userName);

        // then
        assertThat(userGroupService.getAllUserGroupsForUser(userName)).hasSize(4);

        // when
        userGroupService.leaveGroup(userName, groupId);

        // then
        assertThat(userGroupService.getAllUserGroupsForUser(userName)).hasSize(3);
    }
}

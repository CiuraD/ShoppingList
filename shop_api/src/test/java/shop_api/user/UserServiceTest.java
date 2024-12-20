package shop_api.user;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test") 
public class UserServiceTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private User mockUser;

    private final String mockUserId = "mockIDForUser";
    private final String mockUserName = "username";
    private final String mockUserPassword = "password";
    private final String mockUserEmail = "email";

    @BeforeEach
    void setUp() {
        // Przygotowanie użytkownika przed każdym testem
        mockUser = new User();
        mockUser.setUsername(mockUserName);
        mockUser.setPassword(passwordEncoder.encode(mockUserPassword));
        mockUser.setEmail(mockUserEmail);
        mockUser.setId(mockUserId);

        // Zapisanie użytkownika w MongoDB (bazie testowej)
        userRepository.save(mockUser);
    }

    @Test
    void shouldLoginUser() {
        // given
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("username");
        loginRequest.setPassword("password");

        // when
        boolean response = userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());

        // then
        assertThat(response).isTrue();
    }

    @Test
    void shouldUpdateUser() {
        // given
        String oldPassword = mockUser.getPassword();
        User updatedUser = new User();
        updatedUser.setUsername("newUsername");
        updatedUser.setEmail("newEmail");
        updatedUser.setPassword("newPassword");

        // when
        User result = userService.updateUser("mockIDForUser", updatedUser);

        // then
        assertThat(result).isNotNull();
        assertThat(result.getUsername()).isEqualTo("newUsername");
        assertThat(result.getEmail()).isEqualTo("newEmail");
        assertThat(result.getPassword()).isNotEqualTo(oldPassword);
    }

    @Test
    void shouldDeleteUser() {
        // given
        User userToBeDeleted = userRepository.findById(mockUserId).orElseThrow();

        // when
        userService.deleteUser(userToBeDeleted.getId());

        // then
        assertThat(userRepository.findById(mockUserId)).isEmpty();
    }

    @Test
    void shouldGetUserId() {
        // given
        String username = mockUserName;

        // when
        Map<String, String> result = userService.getUserId(username);

        // then
        assertThat(result).isNotNull();
        assertThat(result.get("userId")).isEqualTo(mockUser.getId());
    }
}

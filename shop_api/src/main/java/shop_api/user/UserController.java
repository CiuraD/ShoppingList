package shop_api.user;

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

import shop_api.productList.ProductList;
import shop_api.productList.ProductListRequest;
import shop_api.util.JwtUtil;

@RestController
@RequestMapping("/api/users")
public class UserController {

        private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest RegisterRequest) {
        return userService.registerUser(RegisterRequest);
    }
    
    @PutMapping("/update/{id}")
    public User putMethodName(@PathVariable String id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        if (userService.loginUser(username, password)) {
            String token = jwtUtil.generateToken(username);
            return ResponseEntity.ok(Map.of("message", "Login successful", "token", token));
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @GetMapping("/productLists/{username}")
    public ResponseEntity<?> getProductListsForUserAndGroups(@PathVariable String username) {
        try {
            List<ProductList> productLists = userService.getProductListsForUserAndGroups(username);
            return ResponseEntity.ok(productLists);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping("/addProductList")
    public ResponseEntity<?> addProductListForUser(@RequestBody ProductListRequest productListRequest) {
        try {
            ProductList productList = userService.addProductListForUser(productListRequest);
            return ResponseEntity.ok(productList);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PutMapping("/updateProductList")
    public ResponseEntity<?> updateProductListForUser(@RequestBody ProductListRequest productListRequest) {
        try {
            logger.info("Updating product list for user: {}", productListRequest);
            userService.updateProductListOnUser(productListRequest);
            return ResponseEntity.ok("Product list updated");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}

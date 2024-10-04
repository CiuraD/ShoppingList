package shop_api.user;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import shop_api.product.Product;
import shop_api.product.ProductRepository;
import shop_api.productList.ProductList;
import shop_api.productList.ProductListRepository;
import shop_api.productList.ProductListRequest;
import shop_api.userGroup.UserGroupRepository;


@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductListRepository productListRepository;

    @Autowired
    private UserGroupRepository userGroupRepository;

    @Autowired
    private ProductRepository productRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseEntity<?> registerUser(RegisterRequest registerRequest) {
        User newUser = new User();
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        newUser.setUsername(registerRequest.getUsername());
        newUser.setEmail(registerRequest.getEmail());
        
        if (userRepository.findByUsernameIgnoreCase(newUser.getUsername()) != null) {
            return ResponseEntity.status(400).body("Username already exists");
        }
        
        if (userRepository.save(newUser).getId() == null) {
            return ResponseEntity.status(500).body("Registration failed");
        }
        
        return ResponseEntity.ok(Map.of("message", "Registration successful"));
    }

    public User updateUser(String id, User user) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            if (user.getUsername() != null) {
                existingUser.setUsername(user.getUsername());
            }

            if (user.getEmail() != null) {
                existingUser.setEmail(user.getEmail());
            }

            if (user.getPassword() != null) {
                existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
            }

            return userRepository.save(existingUser);
        }
        return null;
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public boolean loginUser(String username, String password) {
        User user = userRepository.findByUsernameIgnoreCase(username);
        if (user != null) {
            boolean matches = passwordEncoder.matches(password, user.getPassword());
            return matches;
        }
        return false;
    }

    public List<ProductList> getProductListsForUserAndGroups(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<String> userProductListIds = user.getProductListsId();
            List<ProductList> userProductLists = productListRepository.findAllById(userProductListIds);
            logger.info("User product lists: " + userProductLists);

            List<String> userGroupIds = user.getUserGroupId();
            if (userGroupIds == null) {
                return userProductLists;    
            }
            List<ProductList> groupProductLists = userGroupRepository.findAllById(userGroupIds)
                .stream()
                .flatMap(group -> productListRepository.findAllById(group.getProductListsId()).stream())
                .collect(Collectors.toList());

            userProductLists.addAll(groupProductLists);
            Map<String, ProductList> uniqueProductListsMap = userProductLists.stream()
                .collect(Collectors.toMap(ProductList::getId, productList -> productList, (existing, replacement) -> existing));

            return new ArrayList<>(uniqueProductListsMap.values());
        } else {
            throw new RuntimeException("User not found with username " + username);
        }
    }

    public ProductList addProductListForUser(ProductListRequest productListRequest) {
        Optional<User> optionalUser = userRepository.findByUsername(productListRequest.getUserName());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Create ProductList
            ProductList productList = new ProductList(
                productListRequest.getName(),
                null,
                productListRequest.getUserGroupId(),
                user.getId()
            );
            final ProductList savedProductList = productListRepository.save(productList);

            // Create Products and associate them with the ProductList
            List<Product> products = productListRequest.getProducts().stream()
                .map(productRequest -> new Product(
                    productRequest.getName(),
                    productRequest.getQuantity(),
                    productRequest.getQuantityType(),
                    productRequest.getImageId(),
                    savedProductList.getId()
                ))
                .collect(Collectors.toList());
            products = productRepository.saveAll(products);

            // Update ProductList with product IDs
            List<String> productIds = products.stream().map(Product::getId).collect(Collectors.toList());
            savedProductList.setProductsId(productIds);
            final ProductList updatedProductList = productListRepository.save(savedProductList);

            // Associate ProductList with User
            List<String> userProductLists = user.getProductListsId();
            if (userProductLists == null) {
                userProductLists = new ArrayList<>();
            }
            userProductLists.add(updatedProductList.getId());
            user.setProductListsId(userProductLists);
            userRepository.save(user);

            return updatedProductList;
        } else {
            throw new RuntimeException("User not found with ID " + productListRequest.getUserName());
        }
    }
}

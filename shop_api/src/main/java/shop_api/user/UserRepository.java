package shop_api.user;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByUsernameIgnoreCase(String username);

    Optional<User> findByUsername(String username);

    @Override
    Optional<User> findById(String id);
}
package shop_api.userGroup;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserGroupRepository extends MongoRepository<UserGroup, String> {
    List<UserGroup> findAllById(Iterable<String> ids);
    List<UserGroup> findAllByUsersIdsContaining(String userId);
}
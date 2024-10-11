package shop_api.userGroup;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface JoinCodeRepository extends MongoRepository<JoinCode, String> {
    List<JoinCode> findAllByCreatorUserId(String creatorUserId);

    Optional<JoinCode> findByCode(String code);

    boolean existsByCode(String code);
}
package shop_api.productList;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductListRepository extends MongoRepository<ProductList, String> {
    List<ProductList> findAllById(Iterable<String> ids);
    ProductList findFirstByUserIdOrderByUpdatedAtDesc(String userId);

}
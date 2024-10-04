package shop_api.productList;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductListRepository extends MongoRepository<ProductList, String> {
}
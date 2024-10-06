package shop_api.product;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {

    List<Product> findByProductListId(String productListId);
    List<Product> findAllByProductListId(String listId);
}
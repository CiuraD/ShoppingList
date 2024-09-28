package shop_api.productList;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductCatalogRepository extends MongoRepository<ProductCatalog, String> {
}
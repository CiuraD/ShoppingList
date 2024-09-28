package shop_api.productList;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import shop_api.product.Product;

@Document(collection = "product_catalogs")
public class ProductCatalog {
    @Id
    private String id;
    private String name;
    private List<Product> products;

    // Constructors
    public ProductCatalog() {}

    public ProductCatalog(String name, List<Product> products) {
        this.name = name;
        this.products = products;
    }

    public String getId() {
        return id;
    }
    
    public List<Product> getProducts() {
        return products;
    }

    public String getName() {
        return name;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
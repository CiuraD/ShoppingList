package shop_api.product;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import shop_api.enums.QuantityType;

@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String name;
    private double quantity;
    private QuantityType quantityType;
    private String imageString;
    private String productListId;

    public Product(String name, double quantity, QuantityType quantityType, String imageString, String productListId) {
        if (productListId == null || productListId.isEmpty()) {
            throw new IllegalArgumentException("productListId cannot be null or empty");
        }
        this.name = name;
        this.quantity = quantity;
        this.quantityType = quantityType;
        this.imageString = imageString;
        this.productListId = productListId;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public void setQuantityType(QuantityType quantityType) {
        this.quantityType = quantityType;
    }

    public void setImageString(String imageString) {
        this.imageString = imageString;
    }

    public void setProductListId(String productListId) {
        this.productListId = productListId;
    }
    
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getQuantity() {
        return quantity;
    }

    public QuantityType getQuantityType() {
        return quantityType;
    }

    public String getImageString() {
        return imageString;
    }

    public String getProductListId() {
        return productListId;
    }
}
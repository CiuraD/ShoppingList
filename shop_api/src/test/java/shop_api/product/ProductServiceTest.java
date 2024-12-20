package shop_api.product;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.BDDMockito.given;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.ActiveProfiles;

import shop_api.enums.QuantityType;

@ActiveProfiles("test")
public class ProductServiceTest {

    @InjectMocks
    private ProductService productService;

    @Mock
    private ProductRepository productRepository;

    private Product mockProduct;
    private Product mockProduct2;
    private Product mockProduct3;
    
    private final String mockProductId = "mockIDForProduct";
    private final String mockProductName = "mockProductName";
    private final double mockProductQuantity = 1.0;
    private final QuantityType mockProductQuantityType = QuantityType.UNITS;
    private final String mockProductImageString = "mockImageString";
    private final String mockProductListId = "mockIDForProductList";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        mockProduct = new Product(mockProductName, mockProductQuantity, mockProductQuantityType, mockProductImageString, mockProductListId);
        mockProduct.setId(mockProductId);
        mockProduct2 = new Product(mockProductName + "2", mockProductQuantity + 1, mockProductQuantityType, mockProductImageString + "2", mockProductListId);
        mockProduct2.setId(mockProductId + "2");
        mockProduct3 = new Product(mockProductName + "3", mockProductQuantity + 2, mockProductQuantityType, mockProductImageString + "3", mockProductListId);
        mockProduct3.setId(mockProductId + "3");

        given(productRepository.findById(mockProductId)).willReturn(java.util.Optional.of(mockProduct));
        given(productRepository.save(mockProduct)).willReturn(mockProduct);
        given(productRepository.findByProductListId(mockProductListId)).willReturn(List.of(mockProduct, mockProduct2, mockProduct3));
    }

    @Test
    void getAllProducts() {
        // given
        given(productRepository.findAll()).willReturn(List.of(mockProduct, mockProduct2, mockProduct3));

        // when
        List<Product> response = productService.getAllProducts();

        // then
        assertThat(response).contains(mockProduct, mockProduct2, mockProduct3);
    }

    @Test
    void getProductById() {
        // given
        String id = "mockIDForProduct";

        // when
        Product response = productService.getProductById(id);

        // then
        assertThat(response).isEqualTo(mockProduct);
    }

    @Test
    void saveProduct() {
        // given
        Product product = new Product(mockProductName, mockProductQuantity, mockProductQuantityType, mockProductImageString, mockProductListId);
        product.setId(mockProductId);

        given(productRepository.save(product)).willReturn(mockProduct);


        // when
        Product response = productService.saveProduct(product);

        // then
        assertThat(response).isEqualTo(mockProduct);
    }

    @Test
    void getProductsByProductListId() {
        // given
        String productListId = "mockIDForProductList";

        // when
        List<Product> response = productService.getProductsByProductListId(productListId);

        // then
        assertThat(response).contains(mockProduct, mockProduct2, mockProduct3);
    }

    @Test
    void getImage() {
        // given
        String productId = "mockIDForProduct";

        // when
        String response = productService.getImage(productId);

        // then
        assertThat(response).isEqualTo(mockProductImageString);
    }
}
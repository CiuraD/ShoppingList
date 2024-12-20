package shop_api.productList;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.mockito.BDDMockito.given;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
public class ProductListControllerTest {

    @InjectMocks
    private ProductListController productListController;

    @Mock
    private ProductListService productListService;

    private ProductList mockProductList;
    private ProductList mockProductList2;

    private final String mockProductListId = "mockIDForProductList";
    private final String mockProductListName = "productListName";
    private final String mockProductId = "mockIDForProduct";
    private final String mockUserId = "mockIDForUser";
    private final String mockUserGroupId = "mockIDForUserGroup";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        List<String> mockProductsIdFor1 = List.of(mockProductId, mockProductId + "2", mockProductId + "3");
        mockProductList = new ProductList(mockProductListName, mockProductsIdFor1, null, mockUserId);
        mockProductList2 = new ProductList("Second List", List.of("product4", "product5"), null, mockUserId);
    }

    @Test
    void getAllProductLists() {
        // given
        given(productListService.getAllProductLists()).willReturn(List.of(mockProductList, mockProductList2));
        
        // when
        List<ProductList> response = productListController.getAllProductLists();

        // then
        assertThat(response).contains(mockProductList, mockProductList2);
    }

    @Test
    void getProductListById() {
        // given
        String id = "mockIDForProductList";
        given(productListService.getProductListById(mockProductListId)).willReturn(mockProductList);

        // when
        ProductList response = productListController.getProductListById(id);

        // then
        assertThat(response).isEqualTo(mockProductList);
    }

    @Test
    void createProductList() {
        // given
        given(productListService.saveProductList(mockProductList)).willReturn(mockProductList);

        // when
        ProductList response = productListController.createProductList(mockProductList);

        // then
        assertThat(response).isEqualTo(mockProductList);
    }

    @Test
    void shareListWithGroup() {
        // given
        String groupId = "mockIDForUserGroup";
        given(productListService.shareListWithGroup(mockProductListId, mockUserGroupId))
                .willReturn(ResponseEntity.ok().body("Product list shared with group"));

        // when
        ResponseEntity<String> response = productListController.shareListWithGroup(mockProductListId, groupId);

        // then
        assertThat(response.getBody()).isEqualTo("Product list shared with group");
    }

    @Test
    void unshareListWithGroup() {
        // given
        given(productListService.unshareListWithGroup(mockProductListId))
                .willReturn(ResponseEntity.ok().body("Product list unshared with group"));

        // when
        ResponseEntity<String> response = productListController.unshareListWithGroup(mockProductListId);

        // then
        assertThat(response.getBody()).isEqualTo("Product list unshared with group");
    }
}

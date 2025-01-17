# Testowanie i Jakość Oprogramowania

## Autor: Damian Ciura 35192

## Temat projektu: Lista zakupów

### Opis projektu: Projekt polegał na zaprojektowaniu oraz zaimplementowaniu systemu umożliwiającego tworzenie, edytowanie oraz udostępnianie listy zakupów

## Uruchamianie projektu

* Backend
  
  1. otwórz terminal w folderze root projektu
  2. `cd ./shop_api`
  3. `mvn spring-boot:run`

* Frontend

  1. otwórz terminal w folderze root projektu
  2. `cd ./shop_list_web`
  3. `ng run`
  4. apliacja zostanie uruchomiona pod adresem [http://localhost:4200/](http://localhost:4200/)

## Testy

Uruchamianie testów

1. otwórz terminal w folderze root projektu
2. `cd ./shop_api`
3. `mvn test`

### Testy jednostkowe

* [Test ProductService](./shop_api/src/test/java/shop_api/product/ProductServiceTest.java) - Testy sprawdzające wszystkie funkcjonalności serwisu odpowiedzialnego za logikę związaną z pojedyńczym produktem
* [Test UserService](shop_api\src\test\java\shop_api\user\UserServiceTest.java) - Testy sprawdzające wszystkie funkcjonalności serwisu odpowiedzialnego za logikę związaną z pojedyńczym użytkownikiem

### Test zintegrowane

* [Test UserGroupService](shop_api\src\test\java\shop_api\userGroup\UserGroupServiceTest.java) - Testy sprawdzające wszystkie funkcjonalności serwisu odpowiedzialnego za logikę związaną z pojedyńczą grupą użytkowników
* [Test ProductListController](shop_api\src\test\java\shop_api\productList\ProductListControllerTest.java) - Testy sprawdzające wszystkie funkcjonalności kontroleru odpowiedzialnego za logikę związaną z pojedyńczą listą produktów

### Przypadki testowe

#### TC001

| ID       | TC001                                                                 |
|--------------------|----------------------------------------------------------------------|
| **Tytuł**    | Logwoanie do systemu |
| **Warunki początkowe**          | Aplikacja webowa Lista zakupów jest otwarta, użytkownik nie jest zalogowany, znajduje się na ekranie logowania |
| **Kroki testowe**| 1. Wprowadź w polu `Username` wartość `testuser`<br> 2. Wprowadź w polu `Password`  wartość `password123`<br> 3. Naciśnij przycisk `Login` |
| **Oczekiwany rezultat**| Użytkownik jest zalogowany |

#### TC002

| ID       | TC002                                                                 |
|--------------------|----------------------------------------------------------------------|
| **Tytuł**    | Tworzenie grupy |
| **Warunki początkowe**          | Użytkownik jest zalogowany, znajduje się na podstronie `groups` |
| **Kroki testowe**| 1. Naciśnij przycisk: `Create group`<br> 2. Wprowadź w pole `Name` wartość `grupa testowa`<br> 3. Naciśnij przycisk `Create` |
| **Oczekiwany rezultat**| Grupa została utworzona<br> Na ekranie jest wyświetlona nowa grupa |

#### TC003

| ID       | TC003                                                                 |
|--------------------|----------------------------------------------------------------------|
| **Tytuł**    | Usunięcie grupy |
| **Warunki początkowe**          | Użytkownik jest zalogowany<br> Znajduje się na podstronie `groups`<br> Istnieje grupa `grupa testowa` |
| **Kroki testowe**| 1. Naciśnij ikonę kosza |
| **Oczekiwany rezultat**| Grupa została usunięta<br> Na ekranie nie jest widoczna grupa `grupa testowa` |

#### TC004

| ID       | TC004                                                                |
|--------------------|----------------------------------------------------------------------|
| **Tytuł**    | Skopiowanie kodu zaproszeniowego |
| **Warunki początkowe**          | Użytkownik jest zalogowany<br> Znajduje się na podstronie `groups`<br> Istnieje grupa `grupa testowa` |
| **Kroki testowe**| 1. Naciśnij ikonę klucza<br> 2. Naciśnij przycisk z ikoną kopiowania oraz tekstem zawierającym klucz |
| **Oczekiwany rezultat**| Klucz został skopiowany<br> Pojawia się komunikat `Copied to clipboard` |

#### TC005

| ID       | TC005                                                                |
|--------------------|----------------------------------------------------------------------|
| **Tytuł**    | Stworzenie listy zakupów |
| **Warunki początkowe**          | Użytkownik jest zalogowany |
| **Kroki testowe**| 1. W menu bocznym naciśnij przycisk `Create List` <br>  2. Naciśnij ikonę plusa<br> 3. W polu `New Product Name` wprowadź: `produkt testowy 1`<br> 4. W polu `Quantity` wprowadź: `5`<br> 5. W polu `Quantity Type` wybierz: `MASS`<br> 6. Naciśnij przycisk `Save`<br> 7. W polu `List Name` wprowadź: `lista testowa`<br> 8. Naciśnij przycisk `Save`|
| **Oczekiwany rezultat**| Lista została utworzona<br> Pojawia się komunikat `List saved` |

#### TC006

| ID       | TC006                                                                |
|--------------------|----------------------------------------------------------------------|
| **Tytuł**    | Udostępnianie listy zakupów |
| **Warunki początkowe**          | Użytkownik jest zalogowany <br> Użytkownik posiada listę zakupów: `lista testowa` która nie jest udostępniona <br> Użytkownik należy do grupy: `grupa testowa`|
| **Kroki testowe**| 1. W menu bocznym naciśnij przycisk `Lists` <br>  2. Naciśnij ikonę papeirowego samolotu<br> 3. Wybierz z listy: `grupa testowa` <br> 4. Naciśnij `Share`|
| **Oczekiwany rezultat**| Lista została udostępniona<br> Ikona zmieniła się z papeirowego samolotu na papierowy samolot z przekreślonym kołem|

#### TC007

| ID       | TC007                                                                |
|--------------------|----------------------------------------------------------------------|
| **Tytuł**    | Zaprzestanie udostępniania listy zakupów |
| **Warunki początkowe**          | Użytkownik jest zalogowany <br> Użytkownik posiada listę zakupów: `lista testowa` która jest udostępniona <br> Użytkownik należy do grupy: `grupa testowa`|
| **Kroki testowe**| 1. W menu bocznym naciśnij przycisk `Lists` <br>  2. Naciśnij ikonę papeirowego samolotu z przekreślonym kołem<br>|
| **Oczekiwany rezultat**| Lista przestała być udostępniona<br> Ikona zmieniła się z papeirowego samolotu  z przekreślonym kołem na papierowy samolot|

#### TC008

| ID       | TC008                                                                |
|--------------------|----------------------------------------------------------------------|
| **Tytuł**    | Edycja listy zakupów |
| **Warunki początkowe**          | Użytkownik jest zalogowany <br> Użytkownik posiada listę zakupów: `lista testowa` <br>|
| **Kroki testowe**| 1. W menu bocznym naciśnij przycisk `Lists` <br>  2. Naciśnij ikonę długopisu <br> 3. W polu `List Name` zmnień wartość z `lista testowa` na `zmiana listy` <br> 4. Naciśnij `Save`|
| **Oczekiwany rezultat**| Nazwa listy została zmieniona|

#### TC009

| ID       | TC009                                                                |
|--------------------|----------------------------------------------------------------------|
| **Tytuł**    | Usunięcie listy zakupów |
| **Warunki początkowe**          | Użytkownik jest zalogowany <br> Użytkownik posiada listę zakupów: `lista testowa` <br>|
| **Kroki testowe**| 1. W menu bocznym naciśnij przycisk `Lists` <br>  2. Naciśnij ikonę kosza <br> |
| **Oczekiwany rezultat**| Lista zostałą usunięta <br> Lista zakupów: `lista testowa` nie jest wyświetlana w liście list zakupów|

#### TC010

| ID       | TC010                                                                |
|--------------------|----------------------------------------------------------------------|
| **Tytuł**    | Dołączenie do grupy |
| **Warunki początkowe**          | Użytkownik jest zalogowany <br> Użytkownik nie należy do grupy `grupa testowa` <br> Grupa `grupa testowa` istnieje|
| **Kroki testowe**| 1. W menu bocznym naciśnij przycisk `Groups` <br>  2. Naciśnij przycisk `Join Group` <br> 3. W polu: `Join Code` wprowadź kod pobrany jako założyciel grupy <br> 4. Naciśnij przyciks `Join`|
| **Oczekiwany rezultat**| Użytkonik dołączył do grupy <br> Grupa `grupa testowa` jest widoczna|

## Dokumentacja API

Dokumentacja api znajduje się pod adresem [https://app.swaggerhub.com/apis/akademiatarnowska-60a/ShoppingList/v0](https://app.swaggerhub.com/apis/akademiatarnowska-60a/ShoppingList/v0)

Lokalna dokumnetacja API znajduję się w ścieżce: API_Docs\index.html

## Spis technologi

### DevOps

1. GitHub
2. VS code

### Frontend

1. Angular
2. TypeScript
3. AngularMaterial

### Backend

1. Java
2. Springboot

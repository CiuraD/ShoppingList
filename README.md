# ShoppingList# ShoppingList

This is a multi-platform shopping list application with web, mobile, and API components.

## Project Structure

- `shop_api/`: Backend API for the shopping list application.
- `shop_list_mobile/`: Mobile application built with React Native.
- `shop_list_web/`: Web application built with Angular.

## Getting Started

### Prerequisites

- Node.js
- npm or Yarn
- Android Studio (for Android development)
- Xcode (for iOS development)
- Java Development Kit (JDK) (for backend development)
- Maven (for backend development)

### Setting Up the Backend

1. Navigate to the `shop_api` directory:

    ```sh
    cd shop_api
    ```

2. Build the project using Maven:

    ```sh
    ./mvnw clean install
    ```

3. Run the backend server:

    ```sh
    ./mvnw spring-boot:run
    ```

### Setting Up the Mobile Application

1. Navigate to the  directory:

    ```sh
    cd shop_list_mobile
    ```

2. Install the dependencies:

    ```sh
    npm install
    # OR
    yarn install
    ```

3. Start the Metro server:

    ```sh
    npm start
    # OR
    yarn start
    ```

4. Run the application on Android:

    ```sh
    npm run android
    # OR
    yarn android
    ```

5. Run the application on iOS:

    ```sh
    npm run ios
    # OR
    yarn ios
    ```

### Setting Up the Web Application

1. Navigate to the  directory:

    ```sh
    cd shop_list_web
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Run the development server:

    ```sh
    ng serve
    ```

4. Open your browser and navigate to `http://localhost:4200/`.

## Running Tests

### Backend Tests

1. Navigate to the  directory:

    ```sh
    cd shop_api
    ```

2. Run the tests:

    ```sh
    ./mvnw test
    ```

### Mobile Application Tests

1. Navigate to the  directory:

    ```sh
    cd shop_list_mobile
    ```

2. Run the tests:

    ```sh
    npm test
    # OR
    yarn test
    ```

### Web Application Tests

1. Navigate to the  directory:

    ```sh
    cd shop_list_web
    ```

2. Run the tests:

    ```sh
    ng test
    ```

## Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Angular Documentation](https://angular.io/docs)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)

## License

This project is licensed under the MIT License.

# ShoppyGlobe E-commerce Backend

---

## Project Overview

This project provides the robust backend API for the ShoppyGlobe e-commerce application. Built with **Node.js**, **Express.js**, and **MongoDB**, it delivers secure RESTful endpoints for essential e-commerce operations, including product management, user authentication, and shopping cart functionality.

User authentication is handled securely using **JSON Web Tokens (JWT)**, which also controls access to sensitive cart routes, ensuring a protected and reliable user experience.

---

## Features

* **Node.js + Express REST API:** A high-performance and scalable API built on the Node.js runtime and Express.js framework.
* **MongoDB Database with Mongoose ODM:** Utilizes MongoDB for flexible, document-based data storage, with Mongoose as the Object Data Modeling (ODM) library for simplified data interaction.
* **Comprehensive CRUD Operations:** Supports Create, Read, Update, and Delete operations for both products and shopping cart items.
* **User Authentication & Authorization:** Implements secure user registration and login with JWT-based authentication for protected routes.
* **Input Validation & Error Handling:** Ensures data integrity and provides clear error messages for invalid inputs.
* **Password Hashing with bcrypt:** Securely stores user passwords using the `bcrypt` library to prevent unauthorized access.
* **CORS Enabled:** Configured to allow cross-origin requests, facilitating integration with different frontend applications.

---

## Technologies Used

* **Node.js**: JavaScript runtime environment.
* **Express.js**: Web application framework for Node.js.
* **MongoDB**: NoSQL document database.
* **Mongoose**: MongoDB object modeling for Node.js.
* **JSON Web Tokens (JWT)**: For secure authentication and authorization.
* **bcryptjs**: For password hashing.
* **dotenv**: For managing environment variables.
* **cors**: Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

---

## Getting Started

Follow these steps to get the ShoppyGlobe backend up and running on your local machine.



### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/shoppyglobe-backend.git](https://github.com/yourusername/shoppyglobe-backend.git)
    cd shoppyglobe-backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file:**
    In the root directory of your project, create a file named `.env` and add the following variables, replacing the placeholder values:

    ```javascript
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
    * `PORT`: The port your server will run on (e.g., `5000`).
    * `MONGO_URI`: Your MongoDB connection string. For MongoDB Atlas, you can find this in your cluster's "Connect" section.
    * `JWT_SECRET`: A strong, random string used to sign your JWTs. You can generate one online or use a tool.

4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The API will now be running at `http://localhost:5000`.

---

## API Endpoints

This section outlines the available API endpoints and their functionalities.

### Authentication

| Method | Endpoint    | Description                     |
| :----- | :---------- | :------------------------------ |
| `POST` | `/register` | Register a new user             |
| `POST` | `/login`    | Login and receive a JWT token   |

### Products

| Method | Endpoint        | Description                       |
| :----- | :-------------- | :-------------------------------- |
| `GET`  | `/products`     | Get all available products        |
| `GET`  | `/products/:id` | Get a single product by its ID    |
| `POST` | `/products`     | Add a new product (optional)      |

### Cart (Protected Routes)

**Note:** All cart routes require a valid **Authorization Bearer Token** in the request header. You will receive this token upon successful user login.

| Method   | Endpoint            | Description                        |
| :------- | :-------------------| :--------------------------------- |
| `POST`   | `/cart`             | Add a product to the user's cart   |
| `PUT`    | `/cart/:cartItemId` | Update the quantity of a cart item |
| `DELETE` | `/cart/:cartItemId` | Remove a product from the cart     |

---

## MongoDB Database 

Here are visual representations of the database structure and data:

### Products Collection

*(the `products` collection documents, displaying fields like `name`, `description`, `price`, `category`, etc.)*

### Cart Items Collection

*(the `cartitems` collection documents, displaying fields like `userId`, `productId`, `quantity`, etc.)*

---

## API Testing Screenshots

### User Registration (`POST /register`)

### User Login (`POST /login`)

### Get All Products (`GET /products`)

### Add Product to Cart (`POST /cart`)

### Update Cart Item Quantity (`PUT /cart/:cartItemId`)

### Delete Cart Item (`DELETE /cart/:cartItemId`)

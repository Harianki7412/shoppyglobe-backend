# ShoppyGlobe Backend API

This is the backend API for the ShoppyGlobe e-commerce application, built using Node.js, Express.js, and MongoDB. The API supports product listing, shopping cart operations, and user authentication with JWT protection.

---


## Features

- JWT-based user registration and login
- Product listing and detail retrieval
- Secure cart management: add/update/remove products in cart
- Input validation and error handling
- Protected routes for cart operations (only authenticated users)
- MongoDB database integration

---

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- bcryptjs (password hashing)
- cors (cross-origin requests)

---


### Installation

1.  **Clone the repository:**
    ```bash
    git clone (`https://github.com/Harianki7412/shoppyglobe-backend.git`)
    cd shoppyglobe-backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```


3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The API will now be running at `http://localhost:5000`.

---

## API Endpoints

This section outlines the available API endpoints and their functionalities.

### Authentication


API Endpoints
| Method    | Route            | Description                       | Auth Required | 
| ------    | -----------------| ----------------------------------| ------------- | 
| POST      | /auth/register   | Register new user                 | No            | 
| POST      | /auth/login      | Login and obtain JWT token        | No            | 
| GET       | /products        | Get all products                  | No            | 
| GET       | /products/:id    | Get product details by ID         | No            | 
| POST      | /cart            | Add product to user's cart        | Yes           | 
| PUT       | /cart/:productId | Update product quantity in cart   | Yes           | 
| DELETE    | /cart/:productId | Remove product from cart          | Yes           |

---

## Screenshots

### MongoDB Atlas Collections

Here are screenshots of the database collections showing the structure and data.

#### cart Collection
![Product Collection](/ScreenSort/Mogoose_cart.jpg)

#### User Collection
![User Collection](/ScreenSort/Mongoose_User.jpg)

#### Prodect Collection
![User Collection](/ScreenSort/Mongoose_Prodect.jpg)

### Tasting Thunder (ThunderClient/Postman)

These screenshots demonstrate the successful API calls for various endpoints.

#### Add Cart 
![Post Cart](/ScreenSort/Add_To_Cart.jpg)

####  All Product 
![Get Prodect](/ScreenSort/Get_All_Prodect.jpg)

####  Product By Id
![Get Prodect/:Id](/ScreenSort/Get_Prodect_by_Id.jpg)


####  cart Updat
![Put cart Updat](/ScreenSort/User_cart_Updat.jpg)

####  Delete Cart
![Delete Cart](/ScreenSort/User_Delete_Cart.jpg)

####  Login User
![Post Login](/ScreenSort/User_Login.jpg)

####  Login User
![Post Login](/ScreenSort/User_Login.jpg)

Register 

####  Register User
![Post Register](/ScreenSort/User_Register%20.jpg)

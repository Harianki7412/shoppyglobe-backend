import express from "express";
import cors from "cors";

import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import authRoutes from "./routes/auth.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/auth", authRoutes);

// Error Middleware
app.use(errorHandler);

export default app;
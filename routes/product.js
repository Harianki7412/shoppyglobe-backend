import express from "express";
import Product from "../models/Product.js";
import { isValidObjectId } from "../utils/validateObjectId.js";

const router = express.Router();

// GET /products - list all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /products/:id - get product by ID
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /products
router.post("/", async (req, res, next) => {
  const { name, price, description, stockQuantity } = req.body;

  if (!name || !price || stockQuantity == null) {
    return res.status(400).json({ message: "Name, price, and stockQuantity are required" });
  }

  if (price < 0 || stockQuantity < 0) {
    return res.status(400).json({ message: "Price and stockQuantity must be non-negative" });
  }

  try {
    const newProduct = new Product({
      name: name.trim(),
      price,
      description: description ? description.trim() : "",
      stockQuantity,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    next(err);
  }
});


export default router;
import express from "express";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";
import { authMiddleware } from "../middleware/auth.js";
import { isValidObjectId } from "../utils/validateObjectId.js";

const router = express.Router();

router.use(authMiddleware);

// add product to cart
router.post("/", async (req, res, next) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;

  if (!isValidObjectId(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stockQuantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock quantity" });
    }

    let cartItem = await CartItem.findOne({ user: userId, product: productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      if (cartItem.quantity > product.stockQuantity) {
        return res.status(400).json({ message: "Quantity exceeds stock" });
      }
      await cartItem.save();
    } else {
      cartItem = new CartItem({ user: userId, product: productId, quantity });
      await cartItem.save();
    }

    res.status(201).json(cartItem);
  } catch (err) {
    next(err);
  }
});

//- update quantity of a cart item
router.put("/:cartItemId", async (req, res, next) => {
  const userId = req.user.userId;
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  if (!isValidObjectId(cartItemId)) {
    return res.status(400).json({ message: "Invalid cart item ID" });
  }

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    const cartItem = await CartItem.findOne({ _id: cartItemId, user: userId }).populate("product");
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    if (cartItem.product.stockQuantity < quantity) {
      return res.status(400).json({ message: "Quantity exceeds product stock" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (err) {
    next(err);
  }
});

// remove product from cart
router.delete("/:cartItemId", async (req, res, next) => {
  const userId = req.user.userId;
  const { cartItemId } = req.params;

  if (!isValidObjectId(cartItemId)) {
    return res.status(400).json({ message: "Invalid cart item ID" });
  }

  try {
    const cartItem = await CartItem.findOneAndDelete({ _id: cartItemId, user: userId });
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });
    res.json({ message: "Cart item removed successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
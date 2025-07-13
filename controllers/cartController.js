import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// POST /cart - Add product to cart or update quantity if exists
export const addToCart = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ message: "Product ID and valid quantity required" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stockQuantity < quantity) return res.status(400).json({ message: "Not enough stock available" });

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      // If exists, update quantity
      const newQuantity = cart.items[itemIndex].quantity + quantity;
      if (newQuantity > product.stockQuantity) {
        return res.status(400).json({ message: "Quantity exceeds stock available" });
      }
      cart.items[itemIndex].quantity = newQuantity;
    } else {
      // Add new product to cart
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(201).json({ message: "Product added to cart", cart });
  } catch (err) {
    next(err);
  }
};

// PUT /cart/:productId - Update quantity of product in cart
export const updateCartItem = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) return res.status(400).json({ message: "Valid quantity required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stockQuantity < quantity) return res.status(400).json({ message: "Not enough stock available" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) return res.status(404).json({ message: "Product not found in cart" });

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.json({ message: "Cart updated", cart });
  } catch (err) {
    next(err);
  }
};

// DELETE /cart/:productId - Remove product from cart
export const removeCartItem = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const newItems = cart.items.filter(item => item.product.toString() !== productId);

    if (newItems.length === cart.items.length) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.items = newItems;
    await cart.save();

    res.json({ message: "Product removed from cart", cart });
  } catch (err) {
    next(err);
  }
};
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

cartItemSchema.index({ user: 1, product: 1 }, { unique: true });

export default mongoose.model("CartItem", cartItemSchema);
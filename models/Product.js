import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String },
    stockQuantity: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
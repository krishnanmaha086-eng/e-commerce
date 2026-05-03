import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: String,
  items: Array,
});

export default mongoose.model(
  "Cart",
  CartSchema
);
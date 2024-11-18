import mongoose from "mongoose";

const tempSchema = new mongoose.Schema({
  orderId: String,
  paymentStatus: String,
  paymentMethod: String,
  paymentId: String,
  paymentMessage: String,
  statusCode: String,
});

export const Temp = mongoose.model("Temp", tempSchema);

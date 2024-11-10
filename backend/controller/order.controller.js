import { Order } from "../model/order.model.js";
import { applyCouponToOrder } from "../utils/applyCouponToOrder.js";
import { calculateOrderTotal } from "../utils/calculateOrderTotal.js";
import { generateOrderID } from "../utils/generateOrderID.js";

export const createOrder = async (req, res) => {
  try {
    const user = req.user;
    const { products, couponCode, paymentMethod, finalAmount } = req.body;

    // check if the product arrray contain atleast one product
    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Please select at least one product." });
    }

    //Step 1: generate  order id
    const orderId = generateOrderID(paymentMethod);

    // Step 4: Create new order
    const newOrder = new Order({
      orderId,
      user: mongoose.Types.ObjectId(user._id),
      products: products.map((item) => ({
        product: mongoose.Types.ObjectId(item.product),
        quantity: item.quantity,
        price: item.price,
        size: item.size,
      })),
      totalAmount: finalAmount,
      paymentMethod,
      status: "placed",
      isPaid: paymentMethod === "online", // Assuming online orders are paid instantly
      couponCode,
    });

    // Save the order to the database
    await newOrder.save();

    // save the order into user 's orderHistory
    await user.updateOne({ $push: { orderHistory: newOrder._id } });

    return res.status(201).json({
      message: "Order created successfully",
      orderId: newOrder.orderId,
      success: true,
    });
  } catch (error) {
    console.error("Error creating order:", error.message);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const checkOutSummary = async (req, res) => {
  try {
    const { products } = req.body;

    // check if the product arrray contain atleast one product
    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Please select at least one product." });
    }
    let totalAmount = 0;
    const lineItems = products.map((product) => {
      totalAmount += product.unitPrice * product.quantity;
    });

    return res.status(200).json({ products, totalAmount, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

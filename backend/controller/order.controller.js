import { Order } from "../model/order.model.js";
import { Product } from "../model/product.model.js";
import { generateOrderID } from "../utils/generateOrderID.js";

export const createOrder = async (req, res) => {
  try {
    const user = req.user;
    const { address, products, couponCode, paymentMethod, finalAmount } =
      req.body;

    // Ensure user is authenticated
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not authenticated", success: false });
    }

    // check if the product arrray contain atleast one product
    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Please select at least one product." });
    }

    // Validate finalAmount
    if (typeof finalAmount !== "number" || finalAmount <= 0) {
      return res
        .status(400)
        .json({ message: "Invalid total amount", success: false });
    }

    //Step 1: generate  order id
    const orderId = generateOrderID(paymentMethod);

    // Step 2: Update the user's address directly and save it
    if (address) {
      user.address = {
        no: address.no || user.address.no,
        street: address.street || user.address.street,
        city: address.city || user.address.city,
        state: address.state || user.address.state,
        zipcode: address.zipcode || user.address.zipcode,
      };
      await user.save(); // Save the updated user object
    }

    // Step 3: Create new order
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

    // step 5 reduce stock of each product in the order
    for (const item of products) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
    }

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

export const getOrderAdmin = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId })
      .populate("products.product")
      .populate("user");
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }
    return res.status(200).json({ order, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getOrder = async (req, res) => {
  try {
    const user = req.user;
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId })
      .populate("products.product")
      .populate("user");
    if (order.user.toString() !== user._id) {
      return res.status(401).json({
        message: "You are not authorized to view this order",
        success: false,
      });
    }
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }
    return res.status(200).json({ order, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateOrder = async (req, res) => {
  const { trackingId, trackingUrl, status } = req.body;
  const { orderId } = req.params;
  try {
    const order = await Order.findOneAndUpdate(
      { orderId },
      { trackingId, trackingUrl, status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ order, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

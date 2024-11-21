import cloudinary from "../lib/cloudinary.js";
import { Order } from "../model/order.model.js";
import User from "../model/user.model.js";
import { Product } from "../model/product.model.js";
import { Coupon } from "../model/coupon.model.js";
import { generateOrderID } from "../utils/generateOrderID.js";
import {
  sendOrderStatusChangeEmail,
  sendOrderPlacedEmail,
  sendOrderPlacedEmailAdmin,
  sendOrderDeliveryEmail,
} from "../nodemailer/emails.js";

export const createOrder = async (req, res) => {
  try {
    const user = req.user;
    const {
      address,
      products,
      couponCode,
      paymentMethod,
      finalAmount,
      receipt,
    } = req.body;
    let cloudinaryResponse = null;

    // Ensure user is authenticated
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not authenticated", success: false });
    }

    if (user.role === "admin") {
      return res.status(403).json({ message: "Access Denied", success: false });
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

    if (paymentMethod === "bank" && receipt) {
      // upload image to cloudinary and get secureURl
      cloudinaryResponse = await cloudinary.uploader.upload(receipt, {
        folder: "payment-receipts",
      });
    }

    //Step 1: generate  order id
    const orderId = generateOrderID(paymentMethod);

    // Step 2: Update the user's address directly and save it
    if (address) {
      user.address = {
        no: address.no || user.address.no,
        street: address.street || user.address.street,
        city: address.city || user.address.city,
        province: address.province || user.address.province,
        zipcode: address.zipcode || user.address.zipcode,
      };
      user.phone = address.mobileNumber;
      await user.save(); // Save the updated user object
    }

    // Create a formatted address string
    const fullAddress = `${user.address.no}, ${user.address.street}, ${user.address.city}, ${user.address.province}, ${user.address.zipcode}<br><b>Contact Number:</b> ${user.phone}`;

    // Step 3: Create new order
    const newOrder = new Order({
      orderId,
      user: user._id,
      products: products.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: finalAmount,
      paymentMethod,
      status: "placed",
      isPaid: paymentMethod === "online", // Assuming online orders are paid instantly
      couponCode,
      receipt: cloudinaryResponse?.secure_url,
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

    const couponApplied = await Coupon.findOne({ code: couponCode });
    if (couponApplied) {
      couponApplied.userId.push(user._id);
      await couponApplied.save();
    }

    await sendOrderPlacedEmail(
      user.email,
      user.name,
      user._id,
      newOrder.orderId,
      newOrder.orderDate,
      newOrder.status,
      fullAddress,
      newOrder.paymentMethod.toUpperCase(),
      newOrder.totalAmount
    );

    await sendOrderPlacedEmailAdmin(
      user.email,
      newOrder.orderId,
      newOrder.orderDate,
      fullAddress,
      newOrder.paymentMethod.toUpperCase(),
      newOrder.totalAmount
    );

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

    // Verify each product exists in the database
    for (let product of products) {
      const exists = await Product.findById(product._id).select("_id");
      if (!exists) {
        return res
          .status(404)
          .json({ message: `Product with ID ${product._id} not found.` });
      }
    }

    // Calculate total amount from frontend-provided unitPrice and quantity
    let totalAmount = 0;
    let deliveryFee = 0;
    products.forEach((product) => {
      const { unitPrice, quantity } = product;
      if (unitPrice && quantity) {
        totalAmount += unitPrice * quantity;
      } else {
        console.warn(
          `Missing unitPrice or quantity for product ID ${product._id}`
        );
      }
    });

    // if total is < 2000 then add 350 delivery fee
    if (totalAmount < 2000) {
      deliveryFee += 350;
    }

    return res
      .status(200)
      .json({ products, totalAmount, deliveryFee, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .lean()
      .populate("products.product")
      .populate("user");
    if (!orders) {
      return res.status(404).json({ message: "No orders found." });
    }
    return res.status(200).json({ orders, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getOrderAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ orderId: id })
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
    const { id } = req.params;
    const order = await Order.findOne({ id })
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
  const { trackingId, trackingUrl, status, isPaid } = req.body;
  const { id } = req.params;
  try {
    const order = await Order.findOne({ orderId: id });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (trackingId) order.trackingId = trackingId;
    if (trackingUrl) order.trackingUrl = trackingUrl;
    if (status) order.status = status;

    // Set isPaid to true if the status is "delivered"
    if (status === "delivered") {
      order.isPaid = true;

      // Increment the `sold` count for each product in the order
      const incrementSoldCount = order.products.map(async (item) => {
        return Product.findByIdAndUpdate(
          item.product, // Product ID
          { $inc: { sold: item.quantity } }, // Increment `sold` by quantity ordered
          { new: true }
        );
      });

      await Promise.all(incrementSoldCount); // Execute all updates in parallel
    }

    // If isPaid is explicitly provided, update it
    if (req.body.hasOwnProperty("isPaid")) {
      order.isPaid = isPaid;
    }

    await order.save();

    const orderedUser = await User.findOne({ _id: order.user }).select(
      "email name"
    );

    if (status !== "delivered") {
      await sendOrderStatusChangeEmail(
        orderedUser.email,
        orderedUser.name,
        order.orderId,
        order.status,
        order.updatedAt,
        order.isPaid,
        order.trackingUrl,
        order.trackingId
      );
    } else {
      await sendOrderDeliveryEmail(
        orderedUser.email,
        orderedUser.name,
        order.orderId
      );
    }
    return res.status(200).json({ order, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

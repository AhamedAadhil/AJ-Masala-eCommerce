import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import axios from "axios";

import { Order } from "../model/order.model.js";
import User from "../model/user.model.js";
import { Product } from "../model/product.model.js";
import { generateOrderID } from "../utils/generateOrderID.js";

dotenv.config();

export const payherePayment = async (req, res) => {
  const { amount, user, address } = req.body;

  const currency = "LKR";

  if (!amount) {
    return res.status(400).json({ message: "Amount is required" });
  }

  const merchant_id = process.env.PAYHERE_MERCHANT_ID;
  const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET;

  // Hash the secret separately
  const hashedSecret = CryptoJS.MD5(merchant_secret).toString().toUpperCase();

  const amountFormated = parseFloat(amount)
    .toLocaleString("en-us", { minimumFractionDigits: 2 })
    .replaceAll(",", "");

  const orderId = generateOrderID("bank");

  // Create the hash for the payment
  const hash = CryptoJS.MD5(
    merchant_id + orderId + amountFormated + currency + hashedSecret
  )
    .toString()
    .toUpperCase();

  // Prepare payment data for PayHere
  const paymentData = {
    sandbox: true,
    merchant_id: merchant_id,
    return_url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173/payment-success"
        : "https://aj-masala-ecommerce.onrender.com/payment-success",
    cancel_url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173/payment-cancel"
        : "https://aj-masala-ecommerce.onrender.com/payment-cancel",
    notify_url:
      process.env.NODE_ENV === "development"
        ? "https://88b6-2402-4000-23c0-17c9-b144-cff1-5383-53ed.ngrok-free.app/api/payhere/payment/notify"
        : "https://aj-masala-ecommerce.onrender.com/api/payhere/payment/notify",
    order_id: orderId,
    items: orderId,
    amount: amount,
    currency: "LKR",
    hash: hash,
    first_name: user.name,
    last_name: "",
    email: user.email,
    phone: user.phone,
    address: address.city,
    city: address.city,
    country: "Sri Lanka",
  };

  //   console.log(paymentData);

  try {
    // Make a POST request to PayHere to initiate payment
    const response = await axios.post(
      "https://sandbox.payhere.lk/pay/checkout",
      paymentData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Return payment details to frontend
    res.status(200).json({
      success: true,
      merchant_id: merchant_id,
      orderId,
      hash,
      return_url: paymentData.return_url,
      cancel_url: paymentData.cancel_url,
      notify_url: paymentData.notify_url,
      response: response.data,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to process payment" });
  }
};

export const payhereNotify = async (req, res) => {
  try {
    const {
      merchant_id,
      order_id,
      payment_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig,
      method,
      status_message,
      custom_1,
      custom_2,
    } = req.body;

    // console.log("custom_1==", custom_1, "custom_2==", custom_2);

    const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET;

    // Hash the merchant secret separately
    const hashedSecret = CryptoJS.MD5(merchant_secret).toString().toUpperCase();

    // Create the local md5sig for verification
    const local_md5sig = CryptoJS.MD5(
      merchant_id +
        order_id +
        payhere_amount +
        payhere_currency +
        status_code +
        hashedSecret
    )
      .toString()
      .toUpperCase();

    // Verify the MD5 signature
    if (local_md5sig !== md5sig) {
      console.error("Payment verification failed: Invalid MD5 signature.");
      return res.status(400).json({ message: "Invalid MD5 signature." });
    }

    const orderData = JSON.parse(custom_1);
    const userId = custom_2;

    // console.log("finalAmount==", orderData.finalAmount);
    // console.log("userId", userId);

    const user = await User.findById(userId);

    // console.log("orderId==", orderId);

    // Step 1: Update the user's address directly and save it
    if (orderData.address) {
      user.address = {
        no: orderData.address.no || user.address.no,
        street: orderData.address.street || user.address.street,
        city: orderData.address.city || user.address.city,
        province: orderData.address.province || user.address.province,
        zipcode: orderData.address.zipcode || user.address.zipcode,
      };
      user.phone = orderData.address.mobileNumber;
      await user.save(); // Save the updated user object
    }

    // Check payment status code
    if (status_code === "2") {
      // Assuming you have a method to create the order
      const order = new Order({
        orderId: order_id, // Using the PayHere order ID
        user: userId, // Assuming you are passing the user ID
        products: orderData?.products,
        totalAmount: orderData?.finalAmount,
        paymentMethod: orderData?.paymentMethod,
        status: "placed", // Mark as paid
        isPaid: true, // Assuming online orders are paid instantly
        couponCode: orderData?.couponCode,
      });

      // Save the order to the database
      await order.save();

      // save the order into user 's orderHistory
      await user.updateOne({ $push: { orderHistory: order._id } });

      // step 5 reduce stock of each product in the order
      for (const item of orderData?.products) {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { stock: -item.quantity } },
          { new: true }
        );
      }

      return res.status(200).json({ success: true }); // Send success response to PayHere
    } else {
      return res
        .status(200)
        .json({ message: "Payment failed. Please try again.", success: false }); // Send success response to PayHere
    }
  } catch (error) {
    console.error("Error handling PayHere notification:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

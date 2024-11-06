import { redis } from "../lib/redis.js";
import User from "../model/user.model.js";

export const addToCart = async (req, res) => {
  const { productId, quantity, unitPrice } = req.body;
  try {
    const user = req.user;
    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cartItems.push({
        product: productId,
        quantity: quantity,
        unitPrice: unitPrice,
      });
    }
    await user.save();
    // cache the data in redis
    await redis.set(`cart_items:${user._id}`, JSON.stringify(user.cartItems));
    let cartTotal = 0;
    const cartTotalPrice = user.cartItems.map((item) => {
      cartTotal += item.quantity * item.unitPrice;
    });
    return res.status(201).json({
      cartTotalPrice: cartTotalPrice,
      cartItems: user.cartItems,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getCartProducts = async (req, res) => {
  const user = req.user;
  try {
    const cachedCart = await redis.get(`cart_items:${user._id}`);

    // check cart details exist in the cache
    if (cachedCart) {
      return res
        .status(200)
        .json({ cartItems: JSON.parse(cachedCart), success: true });
    }

    // Fetch user from the database and populate cart items with product details
    const userFromDB = await User.findById(req.user._id).populate({
      path: "cartItems.product",
      select: "name description ps stock images category rating", // specify the fields you want from the product
    });

    // If user or cart items are not found
    if (!userFromDB) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const userCart = user.cartItems;

    // cache the produts to redis
    await redis.set(
      `cart_items:${user._id}`,
      JSON.stringify(userCart),
      "EX",
      86400
    ); //24 hours
    return res.status(200).json({ cartItems: userCart, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const removeProductFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const user = req.user;
    const productIndex = await user.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );
    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Product not found in cart", success: false });
    }
    user.cartItems.splice(productIndex, 1);
    await user.save();
    // cache the data in redis
    await redis.set(`cart_items:${user._id}`, JSON.stringify(user.cartItems));
    return res.status(200).json({ cartItems: user.cartItems, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  try {
    const user = req.user;
    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId
    );
    if (!existingItem) {
      return res
        .status(404)
        .json({ message: "Product not found in cart", success: false });
    }
    existingItem.quantity = quantity;
    await user.save();
    // cache the data in redis
    await redis.set(`cart_items:${user._id}`, JSON.stringify(user.cartItems));
    return res.status(200).json({ cartItems: user.cartItems, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

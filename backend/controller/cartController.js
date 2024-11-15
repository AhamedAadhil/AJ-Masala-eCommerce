import { redis } from "../lib/redis.js";
import { Product } from "../model/product.model.js";
import User from "../model/user.model.js";

export const addToCart = async (req, res) => {
  const { productId, quantity, unitPrice } = req.body;
  try {
    const user = req.user;
    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity = quantity;
      existingItem.unitPrice = unitPrice;
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
    const cartTotalPrice = user.cartItems.reduce((total, item) => {
      return total + item.quantity * item.unitPrice;
    }, 0);

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

    // Check if cart details exist in the cache
    if (cachedCart) {
      const parsedCart = JSON.parse(cachedCart);

      // Format the cart items to include necessary product details
      const cartWithProductDetails = await Promise.all(
        parsedCart.map(async (item) => {
          // Fetch product details (name, images) using the productId
          const product = await Product.findById(item.product)
            .select("name images")
            .lean();

          return {
            _id: item._id,
            productId: item.product,
            name: product ? product.name : "Product not found",
            image:
              product && product.images && product.images.length > 0
                ? product.images[0]
                : "",
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          };
        })
      );

      // Calculate total amount from unitPrice and quantity
      let totalAmount = 0;
      cartWithProductDetails.forEach((item) => {
        const { unitPrice, quantity } = item;
        if (unitPrice && quantity) {
          totalAmount += unitPrice * quantity;
        } else {
          console.warn(
            `Missing unitPrice or quantity for product ID ${item._id}`
          );
        }
      });

      return res.status(200).json({
        products: cartWithProductDetails,
        totalAmount,
        success: true,
      });
    }

    // If not in cache, fetch user from the database and populate cart items with product details
    const userFromDB = await User.findById(req.user._id).populate({
      path: "cartItems.product",
      select: "_id", // Only populate product ID (not name and images here)
    });

    if (!userFromDB) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Format the cart items to include necessary product data
    const userCart = await Promise.all(
      userFromDB.cartItems.map(async (item) => {
        const product = await Product.findById(item.product).select(
          "name images"
        );

        return {
          _id: item._id,
          productId: item.product,
          name: product ? product.name : "Product not found",
          image:
            product && product.images && product.images.length > 0
              ? product.images[0]
              : "",
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        };
      })
    );

    // Calculate total amount from unitPrice and quantity
    let totalAmount = 0;
    userCart.forEach((item) => {
      const { unitPrice, quantity } = item;
      if (unitPrice && quantity) {
        totalAmount += unitPrice * quantity;
      } else {
        console.warn(
          `Missing unitPrice or quantity for product ID ${item._id}`
        );
      }
    });

    // Cache the products in Redis
    await redis.set(
      `cart_items:${user._id}`,
      JSON.stringify(userCart),
      "EX",
      86400 // Cache for 24 hours
    );

    return res.status(200).json({
      products: userCart,
      totalAmount,
      success: true,
    });
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

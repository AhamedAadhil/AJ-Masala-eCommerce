import { applyCouponToOrder } from "../util/applyCouponToOrder.js";

export const placeOrder = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    // check if the product arrray contain atleast one product
    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Please select at least one product." });
    }
    let totalAmount = 0;
    const lineItems = products.map((product) => {
      totalAmount += product.price * product.qunatity;

      return {
        price_data: {
          currency: "lkr",
          product_data: {
            name: product.name,
            image: [product.images[0]],
          },
          unit_amount: product.price * product.qunatity,
        },
      };
    });

    let coupon = null;
    if (couponCode) {
      coupon = await applyCouponToOrder(req.user._id, couponCode);
      if (coupon) {
        totalAmount -= coupon.discountAmount;
      }
    }
  } catch (error) {
    return res.status(500).json({ messge: error.message, success: false });
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

// checkoutUtils.js

export const calculateOrderTotal = (products) => {
  let totalAmount = 0;
  products.forEach((item) => {
    totalAmount += item.price * item.quantity;
  });
  return totalAmount;
};

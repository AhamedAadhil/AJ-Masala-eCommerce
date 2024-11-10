export const generateOrderID = (paymentMethod) => {
  // Define the prefix and method identifier
  const prefix = "AJ";
  const methodId =
    paymentMethod === "cod" ? "COD" : paymentMethod === "bank" ? "BNK" : "OLN";

  // Get the current timestamp in milliseconds and take the last 5 digits
  const uniquePart = Date.now().toString().slice(-5);

  // Combine to create the order ID
  const orderId = `${prefix}-${methodId}-${uniquePart}`;

  return orderId;
};

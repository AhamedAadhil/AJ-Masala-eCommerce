import { sendMail } from "./config.js";

import {
  ADMIN_QUERY_NOTIFICATION_MAIL,
  ORDER_DELIVERED_MAIL,
  ORDER_PLACED_MAIL,
  ORDER_PLACED_MAIL_ADMIN,
  ORDER_STATUS_CHANGE_MAIL,
  WELCOME_MAIL,
} from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name) => {
  try {
    const message = WELCOME_MAIL.replace("{customerName}", name);
    const response = await sendMail(
      email,
      "Welcome to A.J Foods Family",
      message
    );
    console.log("Welcome email send successfully! ", response);
  } catch (error) {
    console.error(error.message);
    throw new Error("Error sending welcome email ", error.message);
  }
};

export const sendOrderPlacedEmail = async (
  email,
  name,
  userId,
  orderId,
  orderDate,
  orderStatus,
  orderAddress,
  paymentMethod,
  orderTotal
) => {
  try {
    const message = ORDER_PLACED_MAIL.replace("{customerName}", name)
      .replace("{userId}", userId)
      .replace("{orderID}", orderId)
      .replace("{orderDate}", orderDate)
      .replace("{orderStatus}", orderStatus)
      .replace("{customerAddress}", orderAddress)
      .replace("{paymentMethod}", paymentMethod)
      .replace("{orderTotal}", "LKR" + " " + orderTotal.toFixed(2));
    const response = await sendMail(
      email,
      "Order Placed Successfully",
      message
    );
    console.log("Order placed email send successfully! ", response);
  } catch (error) {
    console.error(error.message);
    throw new Error("Error sending order placed email ", error.message);
  }
};

export const sendOrderPlacedEmailAdmin = async (
  customerEmail,
  orderId,
  orderDate,
  orderAddress,
  paymentMethod,
  orderTotal
) => {
  try {
    const message = ORDER_PLACED_MAIL_ADMIN.replace(
      "[Customer Email]",
      customerEmail
    )
      .replace("[Order ID]", orderId)
      .replace("[Order Date]", orderDate)
      .replace("[Customer Address]", orderAddress)
      .replace("[Payment Method]", paymentMethod)
      .replace("[Order Total]", "LKR" + " " + orderTotal.toFixed(2));
    const response = await sendMail(
      "ahamedaathil.5@gmail.com",
      "AJ Foods: New Order Placed",
      message
    );
    console.log("New order placed email send successfully! ", response);
  } catch (error) {
    console.error(error.message);
    throw new Error("Error sending new order placed email ", error.message);
  }
};

export const sendOrderStatusChangeEmail = async (
  email,
  name,
  orderId,
  orderStatus,
  updatedOn,
  isPaid,
  trackingUrl,
  trackingNumber
) => {
  try {
    // Construct the full tracking URL
    const fullTrackingUrl = `${trackingUrl}/${trackingNumber}`;
    const message = ORDER_STATUS_CHANGE_MAIL.replace("{{customerName}}", name)
      .replace("{{orderId}}", orderId)
      .replace("{{orderStatus}}", orderStatus)
      .replace("{{updatedOn}}", updatedOn)
      .replace("{{isPaid}}", isPaid)
      .replace(/{{trackingUrl}}/g, fullTrackingUrl) // Replace all instances of {{trackingUrl}}
      .replace("{{trackingNumber}}", trackingNumber);

    const response = await sendMail(
      email,
      "AJ Foods: Order Status Update",
      message
    );
    console.log(" Order status update email send successfully! ", response);
  } catch (error) {
    console.error(error.message);
    throw new Error("Error sending new order placed email ", error.message);
  }
};

export const sendOrderDeliveryEmail = async (email, name, orderId) => {
  const message = ORDER_DELIVERED_MAIL.replace(
    "{{customerName}}",
    name
  ).replace(/{{orderId}}/g, orderId);
  try {
    const response = await sendMail(
      email,
      "AJ Foods: Order Delivered Successfully",
      message
    );
    console.log("Order delivered email send successfully! ", response);
  } catch (error) {
    console.error(error.message);
    throw new Error("Error sending new order placed email ", error.message);
  }
};

export const sendAdminQueryNotificationEmail = async (email, content, name) => {
  const message = ADMIN_QUERY_NOTIFICATION_MAIL.replace(
    "{customerEmail}",
    email
  )
    .replace("{message}", content)
    .replace("{customerName}", name);
  try {
    const response = await sendMail(
      "ahamedaathil.5@gmail.com",
      "AJ Foods: Query Notification",
      message
    );
    console.log("Query notification email send successfully! ", response);
  } catch (error) {
    console.error(error.message);
    throw new Error("Error sending query notification email ", error.message);
  }
};

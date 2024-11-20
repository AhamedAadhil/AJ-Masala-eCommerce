export const WELCOME_MAIL = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #eaeaea;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background-color: #000;
      color: #fff;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      font-size: 24px;
      margin: 0;
      color: #FFD700; /* Yellow for contrast */
    }
    .content {
      padding: 20px;
    }
    .content h2 {
      font-size: 20px;
      color: #000;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .button {
      display: block;
      width: fit-content;
      background-color: #FFD700; /* Yellow Button */
      color: #000;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      font-weight: bold;
      border-radius: 5px;
      margin: 0 auto;
    }
    .footer {
      background-color: #000;
      color: #fff;
      text-align: center;
      padding: 15px;
      font-size: 14px;
    }
    .footer a {
      color: #FFD700;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header Section -->
    <div class="header">
      <h1>Welcome to A.J Foods!</h1>
    </div>
    
    <!-- Content Section -->
    <div class="content">
      <h2>Dear {customerName},</h2>
      <p>
        We’re delighted to have you join the A.J Foods family! Our mission is to bring the finest and most authentic flavors directly to your kitchen. 
        Your trust in us is our biggest reward.
      </p>
      <p>
        Get ready to explore an extensive range of premium-quality spices, herbs, and grains that will elevate your cooking experience. Whether you’re 
        recreating family favorites or trying something new, A.J Foods is here to inspire your culinary journey.
      </p>
      <p>
        To get started, check out our latest products and offers by clicking the button below:
      </p>
      <a href="https://www.ajfoods.com" class="button">Explore Now</a>
    </div>
    
    <!-- Footer Section -->
    <div class="footer">
      <p>
        Thank you for choosing A.J Foods. We look forward to serving you the best!
      </p>
      <p>
        <a href="https://www.ajfoods.com">Visit Our Website</a> | 
        <a href="https://www.ajfoods.com/support">Contact Support</a>
      </p>
    </div>
  </div>
</body>
</html>
`;

export const ORDER_PLACED_MAIL = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #eaeaea;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background-color: #000;
      color: #fff;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      font-size: 24px;
      margin: 0;
      color: #FFD700; /* Yellow for contrast */
    }
    .content {
      padding: 20px;
    }
    .content h2 {
      font-size: 20px;
      color: #000;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .order-details {
      background-color: #f8f8f8;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .order-details h3 {
      font-size: 18px;
      margin-bottom: 10px;
      color: #000;
    }
    .order-details p {
      margin: 5px 0;
      font-size: 14px;
    }
    .button {
      display: block;
      width: fit-content;
      background-color: #FFD700; /* Yellow Button */
      color: #000;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      font-weight: bold;
      border-radius: 5px;
      margin: 0 auto;
    }
    .footer {
      background-color: #000;
      color: #fff;
      text-align: center;
      padding: 15px;
      font-size: 14px;
    }
    .footer a {
      color: #FFD700;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header Section -->
    <div class="header">
      <h1>Order Confirmation - A.J Foods</h1>
    </div>
    
    <!-- Content Section -->
    <div class="content">
      <h2>Thank you for your order!</h2>
      <p>
        Dear {customerName},
      </p>
      <p>
        We are excited to let you know that we have received your order. Our team is working to ensure your items are packed with care and delivered to your doorstep as quickly as possible.
      </p>
      
      <!-- Order Details Section -->
      <div class="order-details">
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> {orderID}</p>
        <p><strong>Order Date:</strong> {orderDate}</p>
        <p><strong>Order Status:</strong> {orderStatus}</p>
        <p><strong>Delivery Address:</strong> {customerAddress}</p>
        <p><strong>Payment Method:</strong> {paymentMethod}</p>
        <p><strong>Total Amount:</strong> {orderTotal}</p>
      </div>
      
      <p>
        You can view the status of your order or manage your account by clicking the button below:
      </p>
      <a href="https://www.ajfoods.com/profile/{userId}" class="button">View My Orders</a>
    </div>
    
    <!-- Footer Section -->
    <div class="footer">
      <p>
        Thank you for choosing A.J Foods. We look forward to serving you again!
      </p>
      <p>
        <a href="https://www.ajfoods.com">Visit Our Website</a> | 
        <a href="https://www.ajfoods.com/support">Contact Support</a>
      </p>
    </div>
  </div>
</body>
</html>
`;

export const ORDER_PLACED_MAIL_ADMIN = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #eaeaea;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background-color: #000;
      color: #FFD700; /* Yellow for branding */
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      font-size: 24px;
      margin: 0;
    }
    .content {
      padding: 20px;
    }
    .content h2 {
      font-size: 20px;
      color: #000;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .order-details {
      background-color: #f8f8f8;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .order-details h3 {
      font-size: 18px;
      margin-bottom: 10px;
      color: #000;
    }
    .order-details p {
      margin: 5px 0;
      font-size: 14px;
    }
    .button {
      display: block;
      width: fit-content;
      background-color: #FFD700; /* Yellow Button */
      color: #000;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      font-weight: bold;
      border-radius: 5px;
      margin: 0 auto;
    }
    .footer {
      background-color: #000;
      color: #fff;
      text-align: center;
      padding: 15px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header Section -->
    <div class="header">
      <h1>New Order Placed - A.J Foods</h1>
    </div>
    
    <!-- Content Section -->
    <div class="content">
      <h2>Admin Notification</h2>
      <p>
        Dear Admin,
      </p>
      <p>
        A new order has been placed on the A.J Foods platform. Please review the order details and prepare for fulfillment at your earliest convenience.
      </p>
      
      <!-- Order Details Section -->
      <div class="order-details">
        <h3>Order Summary</h3>
        <p><strong>Order ID:</strong> [Order ID]</p>
        <p><strong>Customer Email:</strong> [Customer Email]</p>
        <p><strong>Order Date:</strong> [Order Date]</p>
        <p><strong>Delivery Address:</strong> [Customer Address]</p>
        <p><strong>Total Amount:</strong> [Order Total]</p>
        <p><strong>Payment Method:</strong> [Payment Method]</p>
      </div>
      
      <p>
        You can view this order and its details in the admin panel by clicking the button below:
      </p>
      <a href="https://www.ajfoods.com/admin/orders/[Order ID]" class="button">View Order</a>
    </div>
    
    <!-- Footer Section -->
    <div class="footer">
      <p>
        This is an automated notification from A.J Foods. For any queries, please contact support.
      </p>
    </div>
  </div>
</body>
</html>
`;

export const ORDER_STATUS_CHANGE_MAIL = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Status Update</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #ffcc00;
      color: #000;
      padding: 20px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 20px;
    }
    .content p {
      margin: 0 0 15px;
      line-height: 1.5;
    }
    .status-box {
      background-color: #fffae6;
      border-left: 4px solid #ffc107;
      padding: 10px;
      margin: 15px 0;
      font-weight: bold;
    }
    .tracking-link {
      color: #007bff;
      text-decoration: none;
    }
    .footer {
      background-color: #000;
      color: #fff;
      text-align: center;
      padding: 15px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">A.J Foods - Order Status Update</div>
    <div class="content">
      <p>Dear <strong>{{customerName}}</strong>,</p>
      <p>We wanted to let you know that the status of your order <strong>{{orderId}}</strong> has been updated.</p>
      <div class="status-box">
        <p>Order Status: {{orderStatus}}</p>
        <p>Updated On: {{updatedOn}}</p>
        <p>Paid: {{isPaid}}</p>
      </div>
      <p>Tracking Number: <strong>{{trackingNumber}}</strong></p>
      <p>
        Track your shipment here: 
        <a class="tracking-link" href="{{trackingUrl}}/{{trackingNumber}}" target="_blank">{{trackingUrl}}</a>
      </p>
      <p>If you have any questions about your order, please don't hesitate to contact our support team.</p>
    </div>
    <div class="footer">
      Thank you for choosing A.J Foods!<br>
      &copy; 2024 A.J Foods. All Rights Reserved.
    </div>
  </div>
</body>
</html>
`;

export const ORDER_DELIVERED_MAIL = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Delivered</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #ffcc00;
      color: #000;
      padding: 20px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 20px;
    }
    .content p {
      margin: 0 0 15px;
      line-height: 1.5;
    }
    .btn-container {
      text-align: center;
      margin: 20px 0;
    }
    .review-btn {
      display: inline-block;
      padding: 12px 20px;
      background-color: #000;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
    }
    .footer {
      background-color: #000;
      color: #fff;
      text-align: center;
      padding: 15px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">A.J Foods - Order Delivered</div>
    <div class="content">
      <p>Dear <strong>{{customerName}}</strong>,</p>
      <p>We are happy to inform you that your order <strong>{{orderId}}</strong> has been successfully delivered!</p>
      <p>We’d greatly appreciate it if you could take a moment to share your feedback. Your reviews help us improve our products and services for everyone.</p>
      <div class="btn-container">
        <a class="review-btn" href="{{profileUrl}}/orders/{{orderId}}" target="_blank">
          Review Your Order
        </a>
      </div>
      <p>Thank you for choosing A.J Foods. We hope you enjoyed your purchase!</p>
    </div>
    <div class="footer">
      Thank you for shopping with A.J Foods!<br>
      &copy; 2024 A.J Foods. All Rights Reserved.
    </div>
  </div>
</body>
</html>
`;

export const ADMIN_QUERY_NOTIFICATION_MAIL = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #eaeaea;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background-color: #000;
      color: #fff;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      font-size: 24px;
      margin: 0;
      color: #FFD700; /* Yellow for contrast */
    }
    .content {
      padding: 20px;
    }
    .content h2 {
      font-size: 20px;
      color: #000;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 10px;
    }
    .query-details {
      background-color: #f7f7f7;
      border: 1px solid #eaeaea;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .query-details p {
      margin: 5px 0;
      font-size: 14px;
    }
    .footer {
      background-color: #000;
      color: #fff;
      text-align: center;
      padding: 15px;
      font-size: 14px;
    }
    .footer a {
      color: #FFD700;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header Section -->
    <div class="header">
      <h1>New Query Received</h1>
    </div>
    
    <!-- Content Section -->
    <div class="content">
      <h2>Hello Admin,</h2>
      <p>
        You have received a new query via the **Contact Us** form on the A.J Foods website. Below are the details of the query:
      </p>
      <div class="query-details">
        <p><strong>Email:</strong> {customerEmail}</p>
        <p><strong>Name:</strong> {customerName}</p>
        <p><strong>Message:</strong></p>
        <p>{message}</p>
      </div>
      <p>
        Please respond to the query at your earliest convenience. For more details, check the admin portal.
      </p>
    </div>
    
    <!-- Footer Section -->
    <div class="footer">
      <p>
        Thank you for staying on top of customer interactions.
      </p>
      <p>
        <a href="https://www.ajfoods.com/admin">Go to Admin Portal</a> | 
        <a href="https://www.ajfoods.com/support">Support</a>
      </p>
    </div>
  </div>
</body>
</html>
`;

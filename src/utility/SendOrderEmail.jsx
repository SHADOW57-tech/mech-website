import emailjs from "emailjs-com";

/**
 * Sends an order confirmation email via EmailJS.
 *
 * @param {Object} param0 - Order details
 * @param {string} param0.customerName - Customer's full name
 * @param {string} param0.email - Customer's email address
 * @param {string} param0.orderId - Unique order ID
 * @param {number} param0.amount - Total amount paid
 * @param {Array} param0.cart - Array of cart items
 * @param {string} param0.method - Payment method used
 */
export const sendOrderEmail = async ({ customerName, email, orderId, amount, cart, method }) => {
  try {
    await emailjs.send(
      "service_xxxxxxxx", // ✅ Replace with your actual EmailJS service ID
      "template_xxxxxxx", // ✅ Replace with your actual EmailJS template ID
      {
        customer_name: customerName,
        email: email,
        order_id: orderId,
        amount: `₦${amount.toLocaleString()}`,
        cart_items: cart.map(item => `${item.name} x${item.quantity}`).join("\n"),
        payment_method: method,
      },
      "hJSZS0F5Mq_pmsQTg" // ✅ Replace with your actual EmailJS public key
    );
    console.log("📧 Email sent successfully!");
  } catch (err) {
    console.error("❌ Email sending failed:", err);
  }
};

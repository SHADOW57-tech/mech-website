// 📁 utility/SendOrderEmail.js
import emailjs from "emailjs-com";

/**
 * Sends an order confirmation email via EmailJS.
 *
 * @param {Object} param0 - Order details
 */
export const sendOrderEmail = async ({
  customerName,
  email,
  orderId,
  amount,
  cart,
  method,
  deliveryAddress = "N/A",
}) => {
  try {
    const formattedItems = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} — Qty: ${item.quantity || 1} — ₦${(
            item.price * (item.quantity || 1)
          ).toLocaleString()}`
      )
      .join("\n");

    await emailjs.send(
      "service_vicxpzd", // ✅ Your EmailJS Service ID
      "template_x2fo91s", // ✅ Your EmailJS Template ID
      {
        customer_name: customerName,
        email,
        order_id: orderId,
        cart_items: formattedItems,
        amount: `₦${amount.toLocaleString()}`,
        payment_method: method,
        delivery_address: deliveryAddress,
      },
      "hJSZS0F5Mq_pmsQTg" // ✅ Your EmailJS Public Key
    );

    console.log("📧 Order email sent successfully!");
  } catch (err) {
    console.error("❌ Failed to send order email:", err);
  }
};

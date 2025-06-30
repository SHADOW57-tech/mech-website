import emailjs from "emailjs-com";

export const sendOrderEmail = async ({ customerName, email, orderId, amount, cart, method }) => {
  try {
    await emailjs.send(
      "your_service_id",
      "your_template_id",
      {
        customer_name: customerName,
        email,
        order_id: orderId,
        amount: `₦${amount.toLocaleString()}`,
        cart_items: cart.map(item => `${item.name} x${item.quantity}`).join("\n"),
        payment_method: method,
      },
      "your_public_key"
    );
    console.log("📧 Email sent!");
  } catch (err) {
    console.error("❌ Email sending failed:", err);
  }
};

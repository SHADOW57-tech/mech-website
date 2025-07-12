const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const fetch = require("node-fetch");

// ✅ Access environment variable securely
const apikey = functions.config().callmebot.key;

exports.sendAdminAlerts = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const orderData = req.body;

      const adminNumbers = ["+2348012345678", "+2348023456789"];
      const adminEmails = ["admin1@example.com", "admin2@example.com"];

      if (!orderData || !orderData.orderId) {
        return res.status(400).json({ error: "Invalid order data" });
      }

      const message = `🚗 *New Order Alert!*
👤 Name: ${orderData.customerName}
🧾 Order ID: ${orderData.orderId}
💰 Amount: ₦${Number(orderData.amount).toLocaleString()}
📦 Items: ${orderData.cart?.map(i => `${i.name} x${i.quantity}`).join(", ")}
💳 Payment: ${orderData.method}
📍 Address: ${orderData.deliveryAddress || "N/A"}
🕒 ${new Date().toLocaleString()}`;

      // Send WhatsApp message
      for (const phone of adminNumbers) {
        const whatsappURL = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
          phone
        )}&text=${encodeURIComponent(message)}&apikey=${apikey}`;

        const resp = await fetch(whatsappURL);
        const resultText = await resp.text();

        if (!resp.ok) {
          console.error(`❌ Failed to send to ${phone}: ${resultText}`);
        } else {
          console.log(`✅ WhatsApp alert sent to ${phone}`);
        }
      }

      return res.status(200).json({ success: true, message: "Alerts sent" });
    } catch (err) {
      console.error("❌ Error in sendAdminAlerts:", err);
      return res.status(500).json({ error: err.message });
    }
  });
});

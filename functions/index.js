const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

// ✅ Secure environment variables
const apikey = functions.config().callmebot.key;
const gmailUser = functions.config().gmail.user;
const gmailPass = functions.config().gmail.pass;

// ✅ Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailUser,
    pass: gmailPass,
  },
});

exports.sendOrderAlerts = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    res.set("Access-Control-Allow-Origin", "*"); // ✅ fixes CORS error
    res.set("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(204).send(""); // preflight response
    }

    try {
      const orderData = req.body;

      const adminNumbers = ["+2348012345678", "+2348023456789"];
      const adminEmails = ["Nwobupeter2021@gmail.Com", "lightlucky775@gmail.com"];

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

      // === 1. Send WhatsApp alerts ===
      for (const phone of adminNumbers) {
        const whatsappURL = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
          phone
        )}&text=${encodeURIComponent(message)}&apikey=${apikey}`;

        try {
          const resp = await fetch(whatsappURL);
          const resultText = await resp.text();

          if (!resp.ok) {
            console.error(`❌ WhatsApp failed for ${phone}: ${resultText}`);
          } else {
            console.log(`✅ WhatsApp alert sent to ${phone}`);
          }
        } catch (error) {
          console.error(`❌ WhatsApp request failed for ${phone}:`, error);
        }
      }

      // === 2. Send Email alerts to Admins ===
      const adminMailOptions = {
        from: `"Shop Alerts" <${gmailUser}>`,
        to: adminEmails.join(","),
        subject: `🚨 New Order: ${orderData.orderId}`,
        text: message,
        html: `<h3>🚗 New Order Alert!</h3>
               <p><b>Name:</b> ${orderData.customerName}</p>
               <p><b>Order ID:</b> ${orderData.orderId}</p>
               <p><b>Amount:</b> ₦${Number(orderData.amount).toLocaleString()}</p>
               <p><b>Items:</b> ${orderData.cart?.map(i => `${i.name} x${i.quantity}`).join(", ")}</p>
               <p><b>Payment:</b> ${orderData.method}</p>
               <p><b>Address:</b> ${orderData.deliveryAddress || "N/A"}</p>
               <p><b>Time:</b> ${new Date().toLocaleString()}</p>`,
      };
      await transporter.sendMail(adminMailOptions);
      console.log("✅ Admin email alerts sent");

      // === 3. Customer Confirmation Email ===
      if (orderData.customerEmail) {
        const customerMailOptions = {
          from: `"Shop Team" <${gmailUser}>`,
          to: orderData.customerEmail,
          subject: `✅ Order Confirmation: ${orderData.orderId}`,
          text: `Hi ${orderData.customerName},\n\nWe’ve received your order (${orderData.orderId}) successfully.\n\nOrder Details:\n${orderData.cart?.map(i => `${i.name} x${i.quantity}`).join(", ")}\n\nTotal: ₦${Number(orderData.amount).toLocaleString()}\nPayment: ${orderData.method}\n\nWe’ll update you once your order is shipped.\n\nThank you for shopping with us!\n\n- Your Shop Team`,
          html: `<h2>✅ Order Confirmation</h2>
                 <p>Hi <b>${orderData.customerName}</b>,</p>
                 <p>We’ve received your order (<b>${orderData.orderId}</b>) successfully.</p>
                 <p><b>Order Details:</b></p>
                 <ul>${orderData.cart?.map(i => `<li>${i.name} x${i.quantity}</li>`).join("")}</ul>
                 <p><b>Total:</b> ₦${Number(orderData.amount).toLocaleString()}</p>
                 <p><b>Payment:</b> ${orderData.method}</p>
                 <p>We’ll update you once your order is shipped.</p>
                 <p>Thank you for shopping with us!<br/>- Your Shop Team</p>`,
        };

        await transporter.sendMail(customerMailOptions);
        console.log(`✅ Confirmation email sent to ${orderData.customerEmail}`);
      }

      return res.status(200).json({ success: true, message: "Admin + Customer alerts sent" });
    } catch (err) {
      console.error("❌ Error in sendOrderAlerts:", err);
      return res.status(500).json({ error: err.message });
    }
  });
});

// 🔁 Everything before this remains unchanged...
import { useState, useEffect } from "react";
import { CreditCard, Home, Banknote } from "lucide-react";
import { FaMoneyBillWave } from "react-icons/fa";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { db, serverTimestamp, auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { sendOrderEmail } from "../utility/SendOrderEmail";
import { onAuthStateChanged } from "firebase/auth";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );
  const shippingFee = 2000;
  const total = subtotal + shippingFee;
  const orderId = `ORD-${Date.now()}`;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://checkout.flutterwave.com/v3.js"]'
    );
    if (existing) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => toast.error("❌ Failed to load payment script");
    document.body.appendChild(script);
  }, []);

  const sendAdminAlerts = async (orderData) => {
  try {
    // ✅ Trigger Firebase Cloud Function
    const res = await fetch("https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/sendAdminAlerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) throw new Error("Admin alert failed");
    console.log("✅ Admin alert sent via Cloud Function");

    // ✅ Send Admin Emails from frontend (optional)
    const adminEmails = ["admin1@example.com", "admin2@example.com"];
    for (const adminEmail of adminEmails) {
      try {
        await sendOrderEmail({ ...orderData, email: adminEmail });
        console.log(`✅ Admin email sent to ${adminEmail}`);
      } catch (emailErr) {
        console.error(`❌ Email to ${adminEmail} failed:`, emailErr);
      }
    }

  } catch (err) {
    console.error("❌ Failed to send admin alert:", err);
  }
};


  const handleOrderSubmit = async () => {
    if (!user) {
      toast.error("⚠️ Please log in to complete your purchase");
      navigate("/login");
      return;
    }

    if (!selectedMethod) return toast.error("Please select a payment method");
    if (selectedMethod === "delivery" && !deliveryAddress.trim()) {
      return toast.error("Please enter your delivery address");
    }

    const customerName = user.displayName || "Customer";
    const email = user.email || "no-email@unknown.com";

    // ✅ Flutterwave card payment
    if (selectedMethod === "card") {
      if (!scriptLoaded || !window.FlutterwaveCheckout) {
        toast.error("Payment gateway not ready. Please wait a moment.");
        return;
      }

      window.FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-1f3b761b0379d7189224306b2227565b-X",
        tx_ref: orderId,
        amount: total,
        currency: "NGN",
        payment_options: "card",
        customer: { email, name: customerName },
        customizations: {
          title: "ICS AutoFix",
          description: "Payment for auto parts/service",
          logo: "https://your-logo.com/logo.png",
        },
        callback: async (response) => {
          if (response.status === "successful") {
            const orderData = {
              orderId,
              customerName,
              email,
              cart,
              method: selectedMethod,
              subtotal,
              shippingFee,
              amount: total,
              transactionId: response.transaction_id,
              status: "successful",
              deliveryAddress,
              createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, "orders"), orderData);
            await addDoc(collection(db, "notifications"), {
              type: "order",
              message: `Order #${orderId} placed successfully!`,
              orderId,
              userId: user.uid,
              createdAt: serverTimestamp(),
              read: false,
            });

            await sendOrderEmail(orderData);
            await sendAdminAlerts(orderData); // ✅ send to admins

            toast.success("✅ Payment successful!");
            clearCart();
            navigate("/success", { state: { order: orderData } });
          } else {
            toast.error("❌ Payment failed");
          }
        },
        onclose: () => toast("❌ Payment was cancelled"),
      });

      return;
    }

    // ✅ Opay, Bank, Delivery
    setLoading(true);
    try {
      const orderData = {
        orderId,
        customerName,
        email,
        cart,
        method: selectedMethod,
        subtotal,
        shippingFee,
        amount: total,
        status: "pending",
        deliveryAddress,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), orderData);
      await addDoc(collection(db, "notifications"), {
        type: "order",
        message: `Order #${orderId} placed successfully!`,
        orderId,
        userId: user.uid,
        createdAt: serverTimestamp(),
        read: false,
      });

      await sendOrderEmail(orderData);
      await sendAdminAlerts(orderData); // ✅ send to admins

      toast.success(`✅ Order submitted with ${selectedMethod}`);
      clearCart();
      navigate("/success", { state: { order: orderData } });
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Payment options UI stays the same...
  const paymentOptions = [
    { id: "opay", label: "Opay", icon: <FaMoneyBillWave size={22} className="text-green-600" /> },
    { id: "card", label: "Card Payment", icon: <CreditCard size={22} /> },
    { id: "delivery", label: "Payment on Delivery", icon: <Home size={22} /> },
    { id: "bank", label: "Bank Transfer", icon: <Banknote size={22} /> },
  ];

  return (
    <div className="text-white max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Checkout</h2>

      <ul className="space-y-4">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between items-center border-b pb-2">
            <span>{item.name}</span>
            <span className="text-gray-700">x{item.quantity}</span>
            <span className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-sm text-right space-y-1">
        <p>Subtotal: ₦{subtotal.toLocaleString()}</p>
        <p>Shipping Fee: ₦{shippingFee.toLocaleString()}</p>
        <p className="font-bold text-green-700 text-lg">Total: ₦{total.toLocaleString()}</p>
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4">Choose Payment Method</h3>
      <div className="space-y-3">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelectedMethod(option.id)}
            className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
              selectedMethod === option.id ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            {option.icon}
            <span className="font-medium">{option.label}</span>
          </div>
        ))}
      </div>

      {selectedMethod === "opay" && (
        <div className="mt-4 bg-green-50 border border-green-200 p-4 rounded-xl">
          <p className="font-semibold text-green-800">Opay Details:</p>
          <p>ICS AutoFix Ventures – 08012345678</p>
          <img src="/qrcode.png" alt="QR" className="w-36 h-36 mt-2 rounded-xl border shadow" />
        </div>
      )}

      {selectedMethod === "bank" && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
          <p className="font-medium text-yellow-700">Bank: UBA</p>
          <p>Acc No: 1234567890</p>
          <p>Name: ICS AutoFix</p>
        </div>
      )}

      {selectedMethod === "delivery" && (
        <div className="mt-4 bg-gray-100 border border-gray-300 p-4 rounded-xl">
          <p className="text-sm text-gray-600">Pay with cash or POS on delivery.</p>
          <textarea
            placeholder="Enter delivery address"
            rows={3}
            className="w-full p-2 mt-2 border rounded focus:outline-none"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
        </div>
      )}

      <button
        onClick={handleOrderSubmit}
        disabled={!selectedMethod || (selectedMethod === "delivery" && !deliveryAddress.trim()) || loading}
        className={`mt-6 w-full py-3 rounded font-bold text-white transition ${
          selectedMethod && (selectedMethod !== "delivery" || deliveryAddress.trim())
            ? "bg-red-600 hover:bg-red-700"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        {loading ? "Processing..." : selectedMethod === "card" ? "Pay with Flutterwave" : "Confirm & Submit Order"}
      </button>
    </div>
  );
}

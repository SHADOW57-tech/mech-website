import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaMoneyBillWave } from "react-icons/fa";
import { CreditCard, Home, Banknote } from "lucide-react";
import { db, serverTimestamp } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { sendOrderEmail } from "../utility/SendOrderEmail";
import { getAuth } from "firebase/auth";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Calculate totals safely
  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return sum + price * qty;
  }, 0);

  const shippingFee = 2000; // flat fee
  const total = subtotal + shippingFee;

  const customerName = "ICS Ice Cold Shadow";
  const email = "customer@example.com";
  const orderId = `ORD-${Date.now()}`;

  const paymentOptions = [
    { id: "opay", label: "Opay", icon: <FaMoneyBillWave size={22} className="text-green-600" /> },
    { id: "card", label: "Card Payment", icon: <CreditCard size={22} /> },
    { id: "delivery", label: "Payment on Delivery", icon: <Home size={22} /> },
    { id: "bank", label: "Bank Transfer", icon: <Banknote size={22} /> },
  ];

 
const handleOrderSubmit = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    toast.error("⚠️ Please log in to complete your purchase");
    navigate("/login");
    return;
  }

  if (!selectedMethod) {
    toast.error("Please select a payment method");
    return;
  }

  if (selectedMethod === "card") {
    const FlutterwaveCheckout = window.FlutterwaveCheckout;
    if (!FlutterwaveCheckout) {
      toast.error("Flutterwave not loaded yet");
      return;
    }

    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-1f3b761b0379d7189224306b2227565b-X",
      tx_ref: orderId,
      amount: total,
      currency: "NGN",
      payment_options: "card",
      customer: {
        email,
        name: customerName,
      },
      customizations: {
        title: "ICS AutoFix",
        description: "Payment for auto parts/service",
        logo: "https://your-logo.com/logo.png",
      },
      callback: async function (response) {
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
            status: "paid",
            createdAt: serverTimestamp(),
          };

          await addDoc(collection(db, "orders"), orderData);
          await sendOrderEmail(orderData);

          toast.success("✅ Payment successful!");
          clearCart();
          navigate("/success", { state: { order: orderData } });
        } else {
          toast.error("❌ Payment failed");
        }
      },
      onclose: () => {
        toast("Payment closed");
      },
    });

    return; // 🛑 Stop here, card handled above
  }

  // 👇 Other methods (opay, delivery, bank)
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
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "orders"), orderData);
    await sendOrderEmail(orderData);

    toast.success(`✅ Order submitted with ${selectedMethod}`);
    clearCart();
    navigate("/success", { state: { order: orderData } });
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Checkout</h2>

      {/* Cart Items */}
      <ul className="space-y-4">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between items-center border-b pb-2">
            <span>{item.name}</span>
            <span className="text-gray-700">x{item.quantity}</span>
            <span className="font-semibold">
              ₦{Number(item.price * item.quantity).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>

      {/* Totals */}
      <div className="mt-6 text-sm text-right space-y-1">
        <p>Subtotal: ₦{subtotal.toLocaleString()}</p>
        <p>Shipping Fee: ₦{shippingFee.toLocaleString()}</p>
        <p className="font-bold text-green-700 text-lg">
          Total: ₦{isNaN(total) ? "0" : total.toLocaleString()}
        </p>
      </div>

      {/* Payment Selection */}
      <h3 className="text-lg font-semibold mt-8 mb-4">Choose Payment Method</h3>
      <div className="space-y-3">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelectedMethod(option.id)}
            className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all
              ${selectedMethod === option.id ? "border-blue-500 bg-blue-50" : "border-gray-300"}
            `}
          >
            {option.icon}
            <span className="font-medium">{option.label}</span>
          </div>
        ))}
      </div>

      {/* Payment Instructions */}
      {selectedMethod === "opay" && (
        <div className="mt-4 bg-green-50 border border-green-200 p-4 rounded-xl space-y-2">
          <p className="font-semibold text-green-800">Pay with Opay</p>
          <div className="text-sm text-gray-700">
            <p>Account Name: <strong>ICS AutoFix Ventures</strong></p>
            <p>Account Number: <strong>08012345678</strong></p>
          </div>
          <div className="mt-2">
            <p className="text-xs text-gray-500">Scan QR code below:</p>
            <img
              src="/qrcode.png"
              alt="Opay QR Code"
              className="w-36 h-36 mt-2 rounded-xl border-2 border-green-200 shadow"
            />
          </div>
        </div>
      )}

      {selectedMethod === "bank" && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
          <p className="font-medium text-yellow-700">Bank Transfer Details:</p>
          <p className="text-sm">Bank: <strong>UBA</strong></p>
          <p className="text-sm">Acc No: <strong>1234567890</strong></p>
          <p className="text-sm">Name: <strong>ICS AutoFix</strong></p>
        </div>
      )}

      {selectedMethod === "delivery" && (
        <div className="mt-4 bg-gray-100 border border-gray-300 p-4 rounded-xl">
          <p className="text-sm text-gray-600">You’ll pay with cash or POS upon delivery.</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleOrderSubmit}
        disabled={!selectedMethod || loading}
        className={`mt-6 w-full py-3 rounded font-semibold text-white transition 
          ${selectedMethod ? "bg-red-600 hover:bg-red-700" : "bg-gray-300 cursor-not-allowed"}
        `}
      >
        {loading ? "Processing..." : "Confirm & Submit Order"}
      </button>
    </div>
  );
}
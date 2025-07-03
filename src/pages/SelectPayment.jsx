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

export default function SelectPayment() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderId = `ORD-${Date.now()}`;
  const email = user?.email || "no-email@unknown.com";
  const customerName = user?.displayName || "Valued Customer";

  const paymentOptions = [
    { id: "opay", label: "Opay", icon: <FaMoneyBillWave size={24} className="text-green-600" /> },
    { id: "card", label: "Flutterwave (Card/Bank)", icon: <CreditCard size={24} /> },
    { id: "delivery", label: "Pay on Delivery", icon: <Home size={24} /> },
    { id: "bank", label: "Bank Transfer", icon: <Banknote size={24} /> },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleProceed = () => {
    if (!selected) {
      toast.error("Please select a payment method");
      return;
    }

    if (selected === "card") return payWithFlutterwave();

    toast.success("✅ Order placed!");

    navigate("/checkout-success", {
      state: {
        order: {
          orderId,
          email,
          customerName,
          cart,
          amount: totalAmount,
          transactionId: "PENDING",
          status: "pending",
          method: selected,
        },
      },
    });

    sendOrderEmail({
      customerName,
      email,
      orderId,
      amount: totalAmount,
      cart,
      method: selected,
    });

    clearCart();
  };

  const payWithFlutterwave = () => {
    const FlutterwaveCheckout = window.FlutterwaveCheckout;
    if (!FlutterwaveCheckout) {
      toast.error("❌ Flutterwave not loaded");
      return;
    }

    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-1f3b761b0379d7189224306b2227565b-X",
      tx_ref: orderId,
      amount: totalAmount,
      currency: "NGN",
      payment_options: "card, banktransfer, ussd",
      customer: {
        email,
        name: customerName,
      },
      customizations: {
        title: "Mechanic Hero",
        description: "Payment for parts/service",
        logo: "https://your-logo-url.com/logo.png",
      },
      callback: async function (response) {
        if (response.status === "successful") {
          toast.success("✅ Payment successful");

          await addDoc(collection(db, "payments"), {
            orderId,
            email,
            customerName,
            cart,
            amount: totalAmount,
            transactionId: response.transaction_id,
            method: "flutterwave",
            status: "successful",
            createdAt: serverTimestamp(),
          });

          sendOrderEmail({
            customerName,
            email,
            orderId,
            amount: totalAmount,
            cart,
            method: "flutterwave",
          });

          clearCart();

          navigate("/checkout-success", {
            state: {
              order: {
                orderId,
                email,
                customerName,
                cart,
                amount: totalAmount,
                transactionId: response.transaction_id,
              },
            },
          });
        } else {
          toast.error("❌ Payment not successful");
        }
      },
      onclose: () => {
        toast("❌ Payment closed");
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Choose Payment Method</h2>

      <div className="space-y-3">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all
              ${selected === option.id ? "border-blue-500 bg-blue-50" : "border-gray-300"}
            `}
          >
            {option.icon}
            <span className="font-medium">{option.label}</span>
          </div>
        ))}
      </div>

      {selected === "bank" && (
        <div className="mt-4 bg-yellow-50 p-4 rounded-xl">
          <p>Bank Name: <strong>UBA</strong></p>
          <p>Account Number: <strong>1234567890</strong></p>
          <p>Account Name: <strong>ICS AutoFix</strong></p>
        </div>
      )}

      {selected === "delivery" && (
        <div className="mt-4 bg-gray-100 p-4 rounded-xl text-sm text-gray-600">
          You’ll pay with cash or POS when we deliver your parts or fix your car.
        </div>
      )}

      <button
        onClick={handleProceed}
        disabled={!selected}
        className={`mt-6 w-full py-3 rounded font-bold text-white transition 
          ${selected ? "bg-red-600 hover:bg-red-700" : "bg-gray-300 cursor-not-allowed"}
        `}
      >
        {selected === "card" ? "Pay with Flutterwave" : "Confirm & Submit Order"}
      </button>
    </div>
  );
}

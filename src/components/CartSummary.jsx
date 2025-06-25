import { useCart } from "../contexts/CartContext";

export default function CartSummary() {
const { cart, removeFromCart, clearCart } = useCart();


  if (!cart.length) {
    return (
      <button
  onClick={clearCart}
  className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded transition font-semibold"
>
  Empty Cart
</button>
      
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-100 via-white to-gray-200 border border-gray-300 shadow-lg p-6 rounded-xl mb-6">
      <h3 className="font-bold mb-4 text-lg text-red-600 text-center">Cart Summary</h3>
      <ul>
        {cart.map((item, idx) => (
          <li key={item.id} className="flex justify-between items-center border-b border-gray-200 py-2">
            <span className="font-medium">{item.name}</span>
            <span className="mx-2 text-gray-700">x{item.qty ?? item.quantity}</span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:text-red-800 hover:underline text-xs transition"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
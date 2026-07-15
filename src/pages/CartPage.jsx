import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(null);

  const handleCheckout = () => {
    if (!user) {
      navigate("/signin", { state: { from: "/cart" } });
      return;
    }
    setOrderPlaced({ total: cartTotal, itemCount: cart.reduce((n, i) => n + i.quantity, 0) });
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <CheckCircle2 size={44} className="mx-auto text-sage mb-4" />
        <h1 className="font-display text-2xl font-semibold text-ink dark:text-paper mb-2">
          Order placed
        </h1>
        <p className="text-slate mb-1">
          Thanks, {user.firstName} — {orderPlaced.itemCount} item
          {orderPlaced.itemCount !== 1 ? "s" : ""} for{" "}
          <span className="font-mono-data text-ink dark:text-paper">${orderPlaced.total.toFixed(2)}</span>.
        </p>
        <p className="text-slate mb-6 text-sm">A confirmation has been sent to {user.email}.</p>
        <Link to="/shop" className="inline-block bg-coral hover:bg-coral-dark text-paper font-medium px-6 py-2.5 rounded-full transition-colors">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <ShoppingBag size={40} className="mx-auto text-slate mb-4" />
        <h1 className="font-display text-2xl font-semibold text-ink dark:text-paper mb-2">
          Your cart is empty
        </h1>
        <p className="text-slate mb-6">Find something worth adding.</p>
        <Link to="/shop" className="inline-block bg-coral hover:bg-coral-dark text-paper font-medium px-6 py-2.5 rounded-full transition-colors">
          Browse catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-ink dark:text-paper mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border border-ink/10 dark:border-paper/10 rounded-xl p-3">
              <img src={item.thumbnail} alt={item.title} className="w-20 h-20 rounded-lg object-cover bg-paper-dim" />
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.id}`} className="font-medium text-ink dark:text-paper hover:text-coral line-clamp-1 transition-colors">
                  {item.title}
                </Link>
                <p className="font-mono-data text-sm text-slate mt-1">${item.price} each</p>
              </div>

              <div className="flex items-center gap-2 border border-ink/15 dark:border-paper/20 rounded-full px-2 py-1">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 text-slate hover:text-coral">
                  <Minus size={14} />
                </button>
                <span className="font-mono-data text-sm w-5 text-center text-ink dark:text-paper">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 text-slate hover:text-coral">
                  <Plus size={14} />
                </button>
              </div>

              <span className="font-mono-data font-semibold text-ink dark:text-paper w-16 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </span>

              <button onClick={() => removeFromCart(item.id)} aria-label="Remove item" className="text-slate hover:text-coral p-1">
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          <button onClick={clearCart} className="text-sm text-slate hover:text-coral transition-colors">
            Clear cart
          </button>
        </div>

        <div className="border border-ink/10 dark:border-paper/10 rounded-xl p-5 h-fit">
          <h2 className="font-display text-lg font-semibold text-ink dark:text-paper mb-4">Order Summary</h2>
          <div className="flex justify-between text-sm text-slate mb-2">
            <span>Subtotal</span>
            <span className="font-mono-data">${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate mb-4">
            <span>Shipping</span>
            <span className="font-mono-data">Free</span>
          </div>
          <div className="flex justify-between font-semibold text-ink dark:text-paper border-t border-ink/10 dark:border-paper/10 pt-4 mb-5">
            <span>Total</span>
            <span className="font-mono-data">${cartTotal.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-coral hover:bg-coral-dark text-paper font-medium py-3 rounded-full transition-colors"
          >
            {user ? "Checkout" : "Sign in to Checkout"}
          </button>
          {!user && (
            <p className="text-xs text-slate text-center mt-2">
              You'll be asked to sign in before your order is placed.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { LogOut, Heart, ShoppingBag, Mail, AtSign } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Account() {
  const { user, logout } = useAuth();
  const { cart, wishlist } = useCart();

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
      <div className="flex items-center gap-4 mb-10">
        <img
          src={user.image}
          alt={user.username}
          className="w-16 h-16 rounded-full object-cover border border-ink/10 dark:border-paper/15"
        />
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink dark:text-paper">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-slate text-sm flex items-center gap-1 mt-0.5">
            <AtSign size={13} /> {user.username}
          </p>
        </div>
      </div>

      <div className="border border-ink/10 dark:border-paper/10 rounded-xl divide-y divide-ink/10 dark:divide-paper/10 mb-8">
        <div className="flex items-center gap-3 px-5 py-4">
          <Mail size={16} className="text-slate" />
          <span className="text-sm text-ink dark:text-paper">{user.email}</span>
        </div>
        <Link to="/cart" className="flex items-center justify-between px-5 py-4 hover:bg-ink/[0.03] dark:hover:bg-paper/[0.03] transition-colors">
          <span className="flex items-center gap-3 text-sm text-ink dark:text-paper">
            <ShoppingBag size={16} className="text-slate" /> Your cart
          </span>
          <span className="font-mono-data text-sm text-slate">{cart.length} item{cart.length !== 1 ? "s" : ""}</span>
        </Link>
        <Link to="/wishlist" className="flex items-center justify-between px-5 py-4 hover:bg-ink/[0.03] dark:hover:bg-paper/[0.03] transition-colors">
          <span className="flex items-center gap-3 text-sm text-ink dark:text-paper">
            <Heart size={16} className="text-slate" /> Your wishlist
          </span>
          <span className="font-mono-data text-sm text-slate">{wishlist.length} item{wishlist.length !== 1 ? "s" : ""}</span>
        </Link>
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-2 text-sm font-medium text-coral hover:text-coral-dark transition-colors"
      >
        <LogOut size={16} /> Log out
      </button>
    </div>
  );
}

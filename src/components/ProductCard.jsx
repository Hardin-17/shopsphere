import { Link } from "react-router-dom";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { user } = useAuth();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="group relative bg-white dark:bg-ink-soft border border-ink/10 dark:border-paper/10 rounded-2xl overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <button
        onClick={() => toggleWishlist(product)}
        aria-label="Toggle wishlist"
        title={user ? undefined : "Sign in to save to wishlist"}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur bg-paper/80 dark:bg-ink/80 transition-colors ${
          inWishlist ? "text-coral" : "text-slate hover:text-coral"
        }`}
      >
        <Heart size={17} fill={inWishlist ? "currentColor" : "none"} />
      </button>

      <Link to={`/product/${product.id}`} className="block aspect-square bg-paper-dim overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="text-xs uppercase tracking-wide text-slate">{product.category}</span>
        <Link to={`/product/${product.id}`} className="font-display font-semibold text-ink dark:text-paper leading-snug line-clamp-2 hover:text-coral transition-colors">
          {product.title}
        </Link>

        <div className="flex items-center gap-1 text-gold text-sm">
          <Star size={14} fill="currentColor" />
          <span className="font-mono-data text-xs text-slate">{product.rating?.toFixed(1)}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-mono-data text-lg font-semibold text-ink dark:text-paper">
            ${product.price}
          </span>
          <button
            onClick={() => addToCart(product)}
            title={user ? undefined : "Sign in to add to cart"}
            className="flex items-center gap-1.5 bg-coral hover:bg-coral-dark text-paper text-sm font-medium px-3 py-1.5 rounded-full transition-colors"
          >
            <ShoppingBag size={14} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

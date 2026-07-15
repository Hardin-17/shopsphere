import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <Heart size={40} className="mx-auto text-slate mb-4" />
        <h1 className="font-display text-2xl font-semibold text-ink dark:text-paper mb-2">
          Your wishlist is empty
        </h1>
        <p className="text-slate mb-6">Tap the heart on any product to save it here.</p>
        <Link to="/shop" className="inline-block bg-coral hover:bg-coral-dark text-paper font-medium px-6 py-2.5 rounded-full transition-colors">
          Browse catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-ink dark:text-paper mb-8">Your Wishlist</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

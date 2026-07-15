import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Star, ShoppingBag, ArrowLeft } from "lucide-react";
import { fetchProductById, fetchProductsByCategory } from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";

const RECENTLY_VIEWED_KEY = "shopsphere_recently_viewed";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setActiveImage(0);

    fetchProductById(id).then((data) => {
      if (cancelled) return;
      setProduct(data);
      setLoading(false);

      // track recently viewed
      const list = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || "[]");
      const updated = [data.id, ...list.filter((pid) => pid !== data.id)].slice(0, 8);
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));

      // related products from same category
      fetchProductsByCategory(data.category, { limit: 4 }).then((res) => {
        if (!cancelled) setRelated(res.products.filter((p) => p.id !== data.id));
      });
    });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <Loader label="Loading product" />;
  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm text-slate hover:text-coral mb-6 transition-colors">
        <ArrowLeft size={15} /> Back to catalog
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-paper-dim mb-3">
            <img
              src={product.images?.[activeImage] || product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2">
              {product.images.slice(0, 5).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    i === activeImage ? "border-coral" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="text-xs uppercase tracking-wide text-slate">{product.category}</span>
          <h1 className="font-display text-3xl font-semibold text-ink dark:text-paper mt-1">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1 text-gold">
              <Star size={16} fill="currentColor" />
              <span className="font-mono-data text-sm text-ink dark:text-paper">{product.rating?.toFixed(1)}</span>
            </div>
            <span className="text-slate text-sm">· {product.stock} in stock</span>
          </div>

          <p className="text-slate mt-4 leading-relaxed">{product.description}</p>

          <div className="flex items-baseline gap-3 mt-6">
            <span className="font-mono-data text-3xl font-semibold text-ink dark:text-paper">
              ${product.price}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sage text-sm font-medium">
                {Math.round(product.discountPercentage)}% off
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => addToCart(product)}
              title={user ? undefined : "Sign in to add to cart"}
              className="flex-1 flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-paper font-medium py-3 rounded-full transition-colors"
            >
              <ShoppingBag size={17} /> Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
              title={user ? undefined : "Sign in to save to wishlist"}
              className={`p-3 rounded-full border transition-colors ${
                inWishlist
                  ? "border-coral text-coral bg-coral/10"
                  : "border-ink/15 dark:border-paper/20 text-slate hover:text-coral hover:border-coral"
              }`}
            >
              <Heart size={19} fill={inWishlist ? "currentColor" : "none"} />
            </button>
          </div>
          {!user && (
            <p className="text-xs text-slate mt-2">
              <Link to="/signin" className="text-coral hover:text-coral-dark font-medium">
                Sign in
              </Link>{" "}
              to add items to your cart or wishlist.
            </p>
          )}

          {product.brand && (
            <p className="text-xs text-slate mt-4">
              Brand: <span className="text-ink dark:text-paper">{product.brand}</span>
            </p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-ink dark:text-paper mb-5">
            Related products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

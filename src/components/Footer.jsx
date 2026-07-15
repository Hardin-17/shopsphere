import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 dark:border-paper/10 mt-16 bg-paper dark:bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate">
        <p className="font-display">
          Shop<span className="text-coral">Sphere</span> — every product, in orbit.
        </p>

        <nav className="flex items-center gap-5">
          <Link to="/" className="hover:text-coral transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-coral transition-colors">Shop</Link>
          <Link to="/about" className="hover:text-coral transition-colors">About</Link>
          <Link to="/contact" className="hover:text-coral transition-colors">Contact</Link>
          <Link to="/wishlist" className="hover:text-coral transition-colors">Wishlist</Link>
        </nav>

        <p>Built with React, Tailwind CSS &amp; DummyJSON.</p>
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-28 text-center">
      <span className="orbit-ring inline-flex w-16 h-16 items-center justify-center text-coral font-display text-2xl font-semibold mb-6">
        404
      </span>
      <h1 className="font-display text-3xl font-semibold text-ink dark:text-paper mb-2">
        This page drifted out of orbit
      </h1>
      <p className="text-slate mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/shop" className="inline-block bg-coral hover:bg-coral-dark text-paper font-medium px-6 py-2.5 rounded-full transition-colors">
        Back to catalog
      </Link>
    </div>
  );
}

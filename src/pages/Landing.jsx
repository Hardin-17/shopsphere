import { Link } from "react-router-dom";
import { Search, Heart, ShoppingBag, ShieldCheck, ArrowRight, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const steps = [
  {
    icon: Search,
    title: "Browse the catalog",
    body: "Search, filter by category, and sort by price or rating — no account needed to look around.",
  },
  {
    icon: UserPlus,
    title: "Create a free account",
    body: "Takes a few seconds. It's what lets the next step actually work.",
  },
  {
    icon: ShoppingBag,
    title: "Add to cart & checkout",
    body: "Your cart and wishlist are tied to your account, so they're there next time too.",
  },
];

export default function Landing() {
  const { user } = useAuth();

  return (
    <div>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 text-center">
        <span className="orbit-ring inline-flex w-14 h-14 items-center justify-center text-coral font-display font-bold text-2xl mb-6">
          S
        </span>
        <span className="font-mono-data text-xs uppercase tracking-[0.2em] text-coral block mb-3">
          Curated · Catalogued · In Orbit
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-semibold text-ink dark:text-paper leading-tight">
          Every product,
          <br />
          <span className="italic text-coral">one sphere</span> at a time.
        </h1>
        <p className="text-slate mt-5 max-w-lg mx-auto leading-relaxed">
          A catalog that stays out of your way — fast search, real filtering, and
          a cart that remembers you. Free to browse. Free to join.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link
            to="/shop"
            className="w-full sm:w-auto text-center bg-coral hover:bg-coral-dark text-paper font-medium px-7 py-3 rounded-full transition-colors"
          >
            Browse Catalog
          </Link>
          {user ? (
            <Link
              to="/account"
              className="w-full sm:w-auto text-center border border-ink/15 dark:border-paper/20 text-ink dark:text-paper font-medium px-7 py-3 rounded-full hover:border-coral hover:text-coral transition-colors"
            >
              Go to My Account
            </Link>
          ) : (
            <Link
              to="/signup"
              className="w-full sm:w-auto text-center border border-ink/15 dark:border-paper/20 text-ink dark:text-paper font-medium px-7 py-3 rounded-full hover:border-coral hover:text-coral transition-colors"
            >
              Create Free Account
            </Link>
          )}
        </div>
      </section>

      <section className="bg-white dark:bg-ink-soft border-y border-ink/10 dark:border-paper/10 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-ink dark:text-paper text-center mb-10">
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <div key={title} className="text-center">
                <span className="orbit-ring inline-flex w-12 h-12 items-center justify-center text-coral mb-4">
                  <Icon size={20} />
                </span>
                <p className="font-mono-data text-xs text-coral mb-1">Step {i + 1}</p>
                <h3 className="font-display font-semibold text-ink dark:text-paper mb-2">{title}</h3>
                <p className="text-slate text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <Heart size={20} className="text-coral shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-semibold text-ink dark:text-paper mb-1">
                Wishlist that remembers
              </h3>
              <p className="text-slate text-sm leading-relaxed">
                Save what you're not ready to buy — tied to your account, not your browser.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <ShieldCheck size={20} className="text-coral shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-semibold text-ink dark:text-paper mb-1">
                Real sessions
              </h3>
              <p className="text-slate text-sm leading-relaxed">
                Your sign-in is validated, not just remembered — so it's actually secure.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <ShoppingBag size={20} className="text-coral shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-semibold text-ink dark:text-paper mb-1">
                One cart, everywhere
              </h3>
              <p className="text-slate text-sm leading-relaxed">
                Log in on another device and your cart's still there.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-center">
        <h2 className="font-display text-3xl font-semibold text-paper mb-3">
          Ready to look around?
        </h2>
        <p className="text-slate mb-7">Browsing is open to everyone — no account required.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-paper font-medium px-7 py-3 rounded-full transition-colors"
        >
          Start Browsing <ArrowRight size={17} />
        </Link>
      </section>
    </div>
  );
}

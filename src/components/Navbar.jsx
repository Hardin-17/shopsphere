import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Heart, Moon, Sun, Menu, X, User, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { cartCount, wishlist } = useCart();
  const { user, logout, initializing } = useAuth();
  const [dark, setDark] = useState(() => localStorage.getItem("shopsphere_theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("shopsphere_theme", dark ? "dark" : "light");
  }, [dark]);

  const handleSearch = (term) => {
    navigate(term ? `/shop?q=${encodeURIComponent(term)}` : "/shop");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 dark:border-paper/10 bg-paper/90 dark:bg-ink/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="orbit-ring w-8 h-8 flex items-center justify-center text-coral font-display font-bold text-lg">
            S
          </span>
          <span className="font-display text-xl font-semibold text-ink dark:text-paper hidden sm:block">
            Shop<span className="text-coral">Sphere</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5 shrink-0 ml-2">
          {[
            { to: "/", label: "Home" },
            { to: "/shop", label: "Shop" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-coral" : "text-slate hover:text-ink dark:hover:text-paper"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block flex-1 max-w-xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>

        <nav className="flex items-center gap-1 sm:gap-3 ml-auto">
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full hover:bg-ink/5 dark:hover:bg-paper/10 text-ink dark:text-paper transition-colors"
          >
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative p-2 rounded-full hover:bg-ink/5 dark:hover:bg-paper/10 text-ink dark:text-paper transition-colors"
          >
            <Heart size={19} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-coral text-paper text-[10px] font-mono-data font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            aria-label="Cart"
            className="relative p-2 rounded-full hover:bg-ink/5 dark:hover:bg-paper/10 text-ink dark:text-paper transition-colors"
          >
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-sage text-ink text-[10px] font-mono-data font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="hidden sm:block w-px h-5 bg-ink/10 dark:bg-paper/15 mx-1" />

          {initializing ? (
            <div className="hidden sm:block w-7 h-7 rounded-full skeleton" />
          ) : user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/account" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <img
                  src={user.image}
                  alt={user.username}
                  className="w-7 h-7 rounded-full object-cover border border-ink/10 dark:border-paper/15"
                />
                <span className="text-sm text-ink dark:text-paper font-medium max-w-[90px] truncate">
                  {user.firstName}
                </span>
              </Link>
              <button
                onClick={logout}
                aria-label="Log out"
                className="p-2 rounded-full hover:bg-ink/5 dark:hover:bg-paper/10 text-slate hover:text-coral transition-colors"
              >
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <Link
              to="/signin"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-ink dark:text-paper hover:text-coral px-2 transition-colors"
            >
              <User size={17} />
              Sign In
            </Link>
          )}

          <button
            className="md:hidden p-2 rounded-full text-ink dark:text-paper"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-3 space-y-3">
          <div className="flex flex-col gap-1 pb-1">
            {[
              { to: "/", label: "Home" },
              { to: "/shop", label: "Shop" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium py-1 transition-colors ${
                    isActive ? "text-coral" : "text-ink dark:text-paper"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <SearchBar onSearch={handleSearch} />
          {user ? (
            <div className="flex items-center justify-between">
              <Link to="/account" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                <img src={user.image} alt={user.username} className="w-7 h-7 rounded-full object-cover" />
                <span className="text-sm text-ink dark:text-paper font-medium">{user.firstName}</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-sm text-slate hover:text-coral"
              >
                <LogOut size={16} /> Log out
              </button>
            </div>
          ) : (
            <Link
              to="/signin"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5 text-sm font-medium text-ink dark:text-paper hover:text-coral"
            >
              <User size={16} /> Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

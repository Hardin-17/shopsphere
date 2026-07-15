import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const { user, login, loading, error, initializing } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  useEffect(() => {
    if (!initializing && user) navigate(redirectTo, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, initializing]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login({ username, password });
    if (success) navigate(redirectTo, { replace: true });
  };

  const fillDemoCredentials = () => {
    setUsername("emilys");
    setPassword("emilyspass");
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-8">
        <span className="orbit-ring inline-flex w-12 h-12 items-center justify-center text-coral font-display font-bold text-xl mb-4">
          S
        </span>
        <h1 className="font-display text-3xl font-semibold text-ink dark:text-paper">
          Welcome back
        </h1>
        <p className="text-slate mt-1.5">
          {location.state?.from
            ? "Sign in to continue where you left off."
            : "Sign in to continue to your account."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-ink dark:text-paper mb-1.5">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            placeholder="emilys"
            className="w-full px-4 py-2.5 rounded-xl border border-ink/15 dark:border-paper/20 bg-white dark:bg-ink-soft text-ink dark:text-paper placeholder:text-slate/60 text-sm focus:outline-none focus:ring-2 focus:ring-coral/50"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-ink dark:text-paper mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 pr-10 rounded-xl border border-ink/15 dark:border-paper/20 bg-white dark:bg-ink-soft text-ink dark:text-paper placeholder:text-slate/60 text-sm focus:outline-none focus:ring-2 focus:ring-coral/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-coral"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-coral bg-coral/10 rounded-lg px-3 py-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark disabled:opacity-60 text-paper font-medium py-3 rounded-full transition-colors"
        >
          <LogIn size={17} />
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <div className="mt-5 text-center">
        <button
          onClick={fillDemoCredentials}
          className="text-sm text-slate hover:text-coral underline underline-offset-2 transition-colors"
        >
          Use demo credentials
        </button>
      </div>

      <p className="text-center text-sm text-slate mt-8">
        New to ShopSphere?{" "}
        <Link to="/signup" className="text-coral hover:text-coral-dark font-medium">
          Create an account
        </Link>
      </p>
      <p className="text-center text-sm text-slate mt-2">
        Just browsing?{" "}
        <Link to="/shop" className="text-coral hover:text-coral-dark font-medium">
          Continue to catalog
        </Link>
      </p>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const { user, signup, loading, error, initializing } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!initializing && user) navigate("/", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, initializing]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [mismatch, setMismatch] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMismatch(true);
      return;
    }
    setMismatch(false);
    const success = await signup(form);
    if (success) navigate("/", { replace: true });
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-8">
        <span className="orbit-ring inline-flex w-12 h-12 items-center justify-center text-coral font-display font-bold text-xl mb-4">
          S
        </span>
        <h1 className="font-display text-3xl font-semibold text-ink dark:text-paper">
          Create your account
        </h1>
        <p className="text-slate mt-1.5">Join ShopSphere to save carts and wishlists.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-ink dark:text-paper mb-1.5">
              First name
            </label>
            <input
              id="firstName"
              type="text"
              value={form.firstName}
              onChange={update("firstName")}
              required
              autoComplete="given-name"
              className="w-full px-4 py-2.5 rounded-xl border border-ink/15 dark:border-paper/20 bg-white dark:bg-ink-soft text-ink dark:text-paper text-sm focus:outline-none focus:ring-2 focus:ring-coral/50"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-ink dark:text-paper mb-1.5">
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              value={form.lastName}
              onChange={update("lastName")}
              required
              autoComplete="family-name"
              className="w-full px-4 py-2.5 rounded-xl border border-ink/15 dark:border-paper/20 bg-white dark:bg-ink-soft text-ink dark:text-paper text-sm focus:outline-none focus:ring-2 focus:ring-coral/50"
            />
          </div>
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-ink dark:text-paper mb-1.5">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={form.username}
            onChange={update("username")}
            required
            autoComplete="username"
            className="w-full px-4 py-2.5 rounded-xl border border-ink/15 dark:border-paper/20 bg-white dark:bg-ink-soft text-ink dark:text-paper text-sm focus:outline-none focus:ring-2 focus:ring-coral/50"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink dark:text-paper mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={update("email")}
            required
            autoComplete="email"
            className="w-full px-4 py-2.5 rounded-xl border border-ink/15 dark:border-paper/20 bg-white dark:bg-ink-soft text-ink dark:text-paper text-sm focus:outline-none focus:ring-2 focus:ring-coral/50"
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
              value={form.password}
              onChange={update("password")}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full px-4 py-2.5 pr-10 rounded-xl border border-ink/15 dark:border-paper/20 bg-white dark:bg-ink-soft text-ink dark:text-paper text-sm focus:outline-none focus:ring-2 focus:ring-coral/50"
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

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-ink dark:text-paper mb-1.5">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={form.confirmPassword}
            onChange={update("confirmPassword")}
            required
            autoComplete="new-password"
            className="w-full px-4 py-2.5 rounded-xl border border-ink/15 dark:border-paper/20 bg-white dark:bg-ink-soft text-ink dark:text-paper text-sm focus:outline-none focus:ring-2 focus:ring-coral/50"
          />
        </div>

        {mismatch && (
          <p className="text-sm text-coral bg-coral/10 rounded-lg px-3 py-2">Passwords don't match.</p>
        )}
        {error && (
          <p className="text-sm text-coral bg-coral/10 rounded-lg px-3 py-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark disabled:opacity-60 text-paper font-medium py-3 rounded-full transition-colors"
        >
          <UserPlus size={17} />
          {loading ? "Creating account…" : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm text-slate mt-8">
        Already have an account?{" "}
        <Link to="/signin" className="text-coral hover:text-coral-dark font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}

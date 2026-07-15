import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  validateName,
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../utils/validation";

const inputClass = (hasError) =>
  `w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-ink-soft text-ink dark:text-paper text-sm focus:outline-none focus:ring-2 transition-colors ${
    hasError
      ? "border-coral focus:ring-coral/40"
      : "border-ink/15 dark:border-paper/20 focus:ring-coral/50"
  }`;

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1 text-xs text-coral mt-1.5">
      <AlertCircle size={12} /> {message}
    </p>
  );
}

const emptyErrors = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

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
  const [fieldErrors, setFieldErrors] = useState(emptyErrors);
  const [touched, setTouched] = useState({});

  const validateField = (field, value, currentForm = form) => {
    switch (field) {
      case "firstName":
        return validateName(value, "First name");
      case "lastName":
        return validateName(value, "Last name");
      case "username":
        return validateUsername(value);
      case "email":
        return validateEmail(value);
      case "password":
        return validatePassword(value);
      case "confirmPassword":
        return validateConfirmPassword(currentForm.password, value);
      default:
        return "";
    }
  };

  const update = (field) => (e) => {
    const value = e.target.value;
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);

    if (touched[field]) {
      setFieldErrors((errs) => ({ ...errs, [field]: validateField(field, value, nextForm) }));
    }
    // re-check confirm password live if the password field itself changes
    if (field === "password" && touched.confirmPassword) {
      setFieldErrors((errs) => ({
        ...errs,
        confirmPassword: validateConfirmPassword(value, nextForm.confirmPassword),
      }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setFieldErrors((errs) => ({ ...errs, [field]: validateField(field, form[field]) }));
  };

  const validateAll = () => {
    const errs = {
      firstName: validateName(form.firstName, "First name"),
      lastName: validateName(form.lastName, "Last name"),
      username: validateUsername(form.username),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(form.password, form.confirmPassword),
    };
    setFieldErrors(errs);
    setTouched({
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    return !Object.values(errs).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;
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

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
              onBlur={handleBlur("firstName")}
              autoComplete="given-name"
              aria-invalid={!!fieldErrors.firstName}
              className={inputClass(!!fieldErrors.firstName)}
            />
            <FieldError message={fieldErrors.firstName} />
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
              onBlur={handleBlur("lastName")}
              autoComplete="family-name"
              aria-invalid={!!fieldErrors.lastName}
              className={inputClass(!!fieldErrors.lastName)}
            />
            <FieldError message={fieldErrors.lastName} />
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
            onBlur={handleBlur("username")}
            autoComplete="username"
            aria-invalid={!!fieldErrors.username}
            className={inputClass(!!fieldErrors.username)}
          />
          <FieldError message={fieldErrors.username} />
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
            onBlur={handleBlur("email")}
            autoComplete="email"
            aria-invalid={!!fieldErrors.email}
            className={inputClass(!!fieldErrors.email)}
          />
          <FieldError message={fieldErrors.email} />
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
              onBlur={handleBlur("password")}
              autoComplete="new-password"
              aria-invalid={!!fieldErrors.password}
              className={`${inputClass(!!fieldErrors.password)} pr-10`}
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
          <FieldError message={fieldErrors.password} />
          {!fieldErrors.password && (
            <p className="text-xs text-slate mt-1.5">At least 6 characters.</p>
          )}
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
            onBlur={handleBlur("confirmPassword")}
            autoComplete="new-password"
            aria-invalid={!!fieldErrors.confirmPassword}
            className={inputClass(!!fieldErrors.confirmPassword)}
          />
          <FieldError message={fieldErrors.confirmPassword} />
        </div>

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

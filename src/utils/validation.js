// Small, reusable validators for the sign-in / sign-up forms. Each returns
// an error string, or "" if the value is valid.

export const validateName = (value, label = "This field") => {
  if (!value.trim()) return `${label} is required.`;
  if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) return `${label} can only contain letters.`;
  return "";
};

export const validateUsername = (value) => {
  if (!value.trim()) return "Username is required.";
  if (value.trim().length < 3) return "Username must be at least 3 characters.";
  if (!/^[a-zA-Z0-9_]+$/.test(value.trim())) {
    return "Only letters, numbers, and underscores are allowed.";
  }
  return "";
};

export const validateEmail = (value) => {
  if (!value.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
    return "Enter a valid email address.";
  }
  return "";
};

export const validatePassword = (value) => {
  if (!value) return "Password is required.";
  if (value.length < 6) return "Password must be at least 6 characters.";
  return "";
};

export const validateLoginPassword = (value) => (!value ? "Password is required." : "");

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "Please confirm your password.";
  if (password !== confirmPassword) return "Passwords don't match.";
  return "";
};

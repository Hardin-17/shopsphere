import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, getCurrentUser, refreshAuthToken } from "../services/api";
import { isUsernameTaken, saveLocalAccount, findLocalAccount } from "../services/localAccounts";

const AuthContext = createContext(null);

const USER_KEY = "shopsphere_user";

const loadStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadStoredUser);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // On app load, re-validate any stored session against the real API rather
  // than trusting localStorage blindly. If the access token expired, try a
  // silent refresh before giving up and signing the person out.
  useEffect(() => {
    const stored = loadStoredUser();

    if (!stored?.accessToken) {
      // Signed up via the mock endpoint (no real token) — trust as-is.
      setInitializing(false);
      return;
    }

    (async () => {
      try {
        const fresh = await getCurrentUser(stored.accessToken);
        setUser({ ...stored, ...fresh });
      } catch {
        try {
          const refreshed = await refreshAuthToken(stored.refreshToken);
          const fresh = await getCurrentUser(refreshed.accessToken);
          setUser({ ...stored, ...fresh, ...refreshed });
        } catch {
          setUser(null);
        }
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  const login = async ({ username, password }) => {
    setLoading(true);
    setError(null);

    // Accounts created through this app's sign-up live in the local store
    // (see services/localAccounts.js) — check there first.
    const localMatch = findLocalAccount(username, password);
    if (localMatch) {
      const { password: _pw, ...safeUser } = localMatch;
      setUser(safeUser);
      setLoading(false);
      return true;
    }

    // Otherwise fall back to DummyJSON's real auth (works for its built-in
    // test accounts, e.g. emilys / emilyspass).
    try {
      const data = await loginUser({ username, password });
      setUser(data);
      return true;
    } catch (err) {
      const message =
        err.response?.status === 400
          ? "Invalid username or password."
          : "Something went wrong. Please try again.";
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({ firstName, lastName, username, email, password }) => {
    setLoading(true);
    setError(null);

    if (isUsernameTaken(username)) {
      setError("That username is already taken.");
      setLoading(false);
      return false;
    }

    try {
      // Still calls DummyJSON's mock endpoint for real API integration, but
      // since it doesn't persist anything, we also save the account locally
      // so the person can actually log back in with it afterward.
      const data = await registerUser({ firstName, lastName, username, email, password });
      const image = `https://api.dicebear.com/9.x/notionists/svg?seed=${username}`;

      saveLocalAccount({ ...data, username, email, password, image });
      setUser({ ...data, username, email, image });
      return true;
    } catch (err) {
      const message =
        err.response?.status === 400
          ? "That username is already taken."
          : "Something went wrong. Please try again.";
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, error, initializing }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

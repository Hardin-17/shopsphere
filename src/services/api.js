import axios from "axios";

const BASE_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// GET /products (supports limit/skip for pagination, q for search)
export const fetchProducts = async ({ limit = 12, skip = 0, q = "" } = {}) => {
  const endpoint = q
    ? `/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`
    : `/products?limit=${limit}&skip=${skip}`;
  const { data } = await api.get(endpoint);
  return data; // { products, total, skip, limit }
};

// GET /products/categories
export const fetchCategories = async () => {
  const { data } = await api.get("/products/categories");
  return data; // array of { slug, name, url }
};

// GET /products/category/:slug
export const fetchProductsByCategory = async (slug, { limit = 12, skip = 0 } = {}) => {
  const { data } = await api.get(
    `/products/category/${encodeURIComponent(slug)}?limit=${limit}&skip=${skip}`
  );
  return data;
};

// GET /products/:id
export const fetchProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

// POST /auth/login — real DummyJSON auth endpoint.
// Test credentials (from https://dummyjson.com/docs/auth): username "emilys", password "emilyspass"
export const loginUser = async ({ username, password }) => {
  const { data } = await api.post("/auth/login", {
    username,
    password,
    expiresInMins: 60,
  });
  return data; // { id, username, email, firstName, lastName, image, accessToken, ... }
};

// POST /users/add — DummyJSON's mock "create user" endpoint. It returns a
// realistic new user object (with an id) but doesn't persist it server-side,
// since DummyJSON is a fake REST API meant for prototyping.
export const registerUser = async ({ firstName, lastName, username, email, password }) => {
  const { data } = await api.post("/users/add", {
    firstName,
    lastName,
    username,
    email,
    password,
  });
  return data; // { id, firstName, lastName, username, email, ... }
};

// GET /auth/me — validates an access token and returns the current user.
// Used on app load to confirm a stored session is still valid.
export const getCurrentUser = async (accessToken) => {
  const { data } = await api.get("/auth/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

// POST /auth/refresh — exchanges a refresh token for a new access/refresh
// token pair, so a session can survive past the access token's expiry
// without forcing the person to log in again.
export const refreshAuthToken = async (refreshToken) => {
  const { data } = await api.post("/auth/refresh", {
    refreshToken,
    expiresInMins: 60,
  });
  return data; // { accessToken, refreshToken }
};

export default api;

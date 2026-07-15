import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

const CART_KEY = "shopsphere_cart";
const WISHLIST_KEY = "shopsphere_wishlist";

const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const initialState = {
  cart: loadFromStorage(CART_KEY, []),
  wishlist: loadFromStorage(WISHLIST_KEY, []),
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      const cart = existing
        ? state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, { ...action.payload, quantity: 1 }];
      return { ...state, cart };
    }
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity < 1) {
        return { ...state, cart: state.cart.filter((item) => item.id !== id) };
      }
      return {
        ...state,
        cart: state.cart.map((item) => (item.id === id ? { ...item, quantity } : item)),
      };
    }
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "TOGGLE_WISHLIST": {
      const exists = state.wishlist.some((item) => item.id === action.payload.id);
      const wishlist = exists
        ? state.wishlist.filter((item) => item.id !== action.payload.id)
        : [...state.wishlist, action.payload];
      return { ...state, wishlist };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  // Adding to cart or wishlist requires a real, signed-in account. Guests get
  // sent to sign in and are returned to exactly where they were afterward.
  const requireAccount = () => {
    if (!user) {
      navigate("/signin", { state: { from: location.pathname + location.search } });
      return false;
    }
    return true;
  };

  const addToCart = (product) => {
    if (!requireAccount()) return;
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  const removeFromCart = (id) => dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const updateQuantity = (id, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const toggleWishlist = (product) => {
    if (!requireAccount()) return;
    dispatch({ type: "TOGGLE_WISHLIST", payload: product });
  };
  const isInWishlist = (id) => state.wishlist.some((item) => item.id === id);

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    cart: state.cart,
    wishlist: state.wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isInWishlist,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};

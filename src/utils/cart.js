const CART_KEY = "route-shop-cart";
const CUSTOMER_KEY = "route-shop-customer";
const ADDRESS_KEY = "route-shop-address";

export const getCart = () => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to read cart", error);
    return [];
  }
};

export const saveCart = (cart) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const getSavedCustomer = () => {
  if (typeof window === "undefined") return { name: "", email: "" };
  try {
    const saved = localStorage.getItem(CUSTOMER_KEY);
    return saved ? JSON.parse(saved) : { name: "", email: "" };
  } catch (error) {
    console.error("Failed to read saved customer", error);
    return { name: "", email: "" };
  }
};

export const saveCustomer = (customer) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
};

export const getSavedAddress = () => {
  if (typeof window === "undefined") return { address: "", city: "", zip: "", country: "" };
  try {
    const saved = localStorage.getItem(ADDRESS_KEY);
    return saved
      ? JSON.parse(saved)
      : { address: "", city: "", zip: "", country: "" };
  } catch (error) {
    console.error("Failed to read saved address", error);
    return { address: "", city: "", zip: "", country: "" };
  }
};

export const saveAddress = (address) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADDRESS_KEY, JSON.stringify(address));
};

export const getSavedPayment = () => {
  if (typeof window === "undefined") return { cardName: "", cardNumber: "", expiry: "", cvv: "" };
  try {
    const saved = localStorage.getItem("route-shop-payment");
    return saved
      ? JSON.parse(saved)
      : { cardName: "", cardNumber: "", expiry: "", cvv: "" };
  } catch (error) {
    console.error("Failed to read saved payment", error);
    return { cardName: "", cardNumber: "", expiry: "", cvv: "" };
  }
};

export const savePayment = (payment) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("route-shop-payment", JSON.stringify(payment));
};

export const addToCart = (item) => {
  const cart = getCart();
  const existing = cart.find(
    (cartItem) =>
      cartItem.id === item.id &&
      cartItem.size === item.size &&
      cartItem.color === item.color
  );

  if (existing) {
    existing.quantity += item.quantity || 1;
  } else {
    cart.push({
      ...item,
      quantity: item.quantity || 1,
    });
  }

  saveCart(cart);
  return cart;
};

export const removeFromCart = (item) => {
  const cart = getCart().filter(
    (cartItem) =>
      !(
        cartItem.id === item.id &&
        cartItem.size === item.size &&
        cartItem.color === item.color
      )
  );
  saveCart(cart);
  return cart;
};

export const updateCartItem = (item, quantity) => {
  const cart = getCart().map((cartItem) => {
    if (
      cartItem.id === item.id &&
      cartItem.size === item.size &&
      cartItem.color === item.color
    ) {
      return { ...cartItem, quantity: Math.max(1, quantity) };
    }
    return cartItem;
  });
  saveCart(cart);
  return cart;
};

export const clearCart = () => {
  saveCart([]);
};

const HISTORY_KEY = "route-shop-history";
const ORDER_LIFETIME_MS = 10 * 60 * 1000;

const isOrderExpired = (order) => {
  if (!order.timestamp) return false;
  return Date.now() - order.timestamp > ORDER_LIFETIME_MS;
};

export const getOrderHistory = () => {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    const history = saved ? JSON.parse(saved) : [];
    const filtered = history.filter((order) => !isOrderExpired(order));
    if (filtered.length !== history.length) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
    }
    return filtered;
  } catch (error) {
    console.error("Failed to read order history", error);
    return [];
  }
};

export const addOrderToHistory = (order) => {
  const history = getOrderHistory();
  const nextHistory = [{ ...order, timestamp: Date.now() }, ...history];
  if (typeof window !== "undefined") {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
    window.dispatchEvent(new Event("historyUpdated"));
  }
  return nextHistory;
};

export const getCartCount = () => {
  return getCart().reduce((sum, item) => sum + (item.quantity || 0), 0);
};

export const getCartTotal = () => {
  return getCart().reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
};

import React, { useEffect, useState } from "react";
import {
  getCart,
  saveCart,
  removeFromCart,
  updateCartItem,
  getCartTotal,
  clearCart,
  addOrderToHistory,
  getOrderHistory,
  getSavedCustomer,
  saveCustomer,
  getSavedAddress,
  saveAddress,
  getSavedPayment,
  savePayment,
} from "../utils/cart";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [customer, setCustomer] = useState({ name: "", email: "" });
  const [address, setAddress] = useState({ address: "", city: "", zip: "", country: "" });
  const [payment, setPayment] = useState({ cardName: "", cardNumber: "", expiry: "", cvv: "" });
  const [history, setHistory] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(null);

  const getItemKey = (item) => `${item.id}-${item.size}-${item.color}`;
  const isSelected = (item) => selectedItems[getItemKey(item)] !== false;
  const selectedCart = cart.filter(isSelected);
  const selectedTotal = selectedCart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  useEffect(() => {
    const syncCart = () => {
      const currentCart = getCart();
      setCart(currentCart);
      setSelectedItems((prev) => {
        const nextSelection = {};
        currentCart.forEach((item) => {
          const key = getItemKey(item);
          nextSelection[key] = prev[key] !== undefined ? prev[key] : true;
        });
        return nextSelection;
      });
    };

    const syncHistory = () => setHistory(getOrderHistory());
    syncCart();
    syncHistory();
    setCustomer(getSavedCustomer());
    setAddress(getSavedAddress());
    setPayment(getSavedPayment());
    window.addEventListener("cartUpdated", syncCart);
    window.addEventListener("historyUpdated", syncHistory);
    return () => {
      window.removeEventListener("cartUpdated", syncCart);
      window.removeEventListener("historyUpdated", syncHistory);
    };
  }, []);

  const handleRemove = (item) => {
    setCart(removeFromCart(item));
  };

  const handleQuantityChange = (item, value) => {
    const nextQuantity = Math.max(1, Number(value) || 1);
    setCart(updateCartItem(item, nextQuantity));
  };

  const toggleItemSelection = (item) => {
    const key = getItemKey(item);
    setSelectedItems((prev) => ({ ...prev, [key]: !isSelected(item) }));
  };

  const startCheckout = () => {
    if (!selectedCart.length) {
      alert("Please select at least one item to checkout.");
      return;
    }

    const hasCustomer = customer.name.trim() && customer.email.trim();
    const hasAddress =
      address.address.trim() &&
      address.city.trim() &&
      address.zip.trim() &&
      address.country.trim();

    if (hasCustomer && hasAddress) {
      setCheckoutStep(3);
      return;
    }

    if (hasCustomer) {
      setCheckoutStep(2);
      return;
    }

    setCheckoutStep(1);
  };

  const proceedToAddress = () => {
    if (!customer.name.trim() || !customer.email.trim()) {
      alert("Please enter your name and email.");
      return;
    }
    saveCustomer(customer);
    setCheckoutStep(2);
  };

  const proceedToPayment = () => {
    if (!address.address.trim() || !address.city.trim() || !address.zip.trim() || !address.country.trim()) {
      alert("Please complete your address details.");
      return;
    }
    saveAddress(address);
    setCheckoutStep(3);
  };

  const handlePayment = () => {
    if (!payment.cardName.trim() || !payment.cardNumber.trim() || !payment.expiry.trim() || !payment.cvv.trim()) {
      alert("Please complete your payment details.");
      return;
    }

    const order = {
      id: `order-${Date.now()}`,
      date: new Date().toLocaleString(),
      customer,
      address,
      payment: { cardName: payment.cardName, last4: payment.cardNumber.slice(-4) },
      items: selectedCart,
      total: selectedTotal,
    };

    addOrderToHistory(order);
    saveCustomer(customer);
    saveAddress(address);
    savePayment(payment);

    const remainingCart = cart.filter((item) => !isSelected(item));
    saveCart(remainingCart);
    setCart(remainingCart);

    setOrderSuccess(order);
    setCheckoutStep(4);
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const resetCheckout = () => {
    setCheckoutStep(0);
    setCustomer({ name: "", email: "" });
    setAddress({ address: "", city: "", zip: "", country: "" });
    setPayment({ cardName: "", cardNumber: "", expiry: "", cvv: "" });
    setOrderSuccess(null);
  };

  if (!cart.length && checkoutStep === 0) {
    return (
      <div className="cart-page">
        <h2>cart is empty</h2>
        {history.length > 0 && (
          <div className="order-history">
            <h3>Order History</h3>
            {history.map((order) => (
              <div key={order.id} className="order-card">
                <p>{order.date}</p>
                <p>{order.customer.name}</p>
                <p>Total: ${order.total.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {checkoutStep === 0 && (
        <>
          <div className="cart-list">
            {cart.map((item) => {
              const key = getItemKey(item);
              const selected = isSelected(item);
              return (
                <div key={key} className={`cart-item ${selected ? "selected" : ""}`}>
                  <label className="cart-select">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleItemSelection(item)}
                    />
                  </label>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>{item.category}</p>
                    <p>Size: {item.size || "-"}</p>
                    <p>Color: {item.color || "-"}</p>
                    <div className="cart-item-controls">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item, e.target.value)}
                      />
                      <button onClick={() => handleRemove(item)}>Remove</button>
                    </div>
                  </div>
                  <div className="cart-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-total">
            <div>
              <h3>Total Price</h3>
              <p>${selectedTotal.toFixed(2)}</p>
            </div>
            <button className="btn checkout-btn" onClick={startCheckout}>
              Checkout selected
            </button>
          </div>
        </>
      )}

      {checkoutStep === 1 && (
        <div className="checkout-form">
          <h3>Checkout: Contact</h3>
          <div className="checkout-fields">
            <label>
              Name
              <input
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
              />
            </label>
          </div>
          <div className="checkout-actions">
            <button className="btn" onClick={() => setCheckoutStep(0)}>
              Back to Cart
            </button>
            <button className="btn checkout-btn" onClick={proceedToAddress}>
              More Checkout
            </button>
          </div>
        </div>
      )}

      {checkoutStep === 2 && (
        <div className="checkout-form">
          <h3>Checkout: Address</h3>
          <div className="checkout-fields">
            <label>
              Address
              <input
                value={address.address}
                onChange={(e) => setAddress({ ...address, address: e.target.value })}
              />
            </label>
            <label>
              City
              <input
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
              />
            </label>
            <label>
              ZIP
              <input
                value={address.zip}
                onChange={(e) => setAddress({ ...address, zip: e.target.value })}
              />
            </label>
            <label>
              Country
              <input
                value={address.country}
                onChange={(e) => setAddress({ ...address, country: e.target.value })}
              />
            </label>
          </div>
          <div className="checkout-actions">
            <button className="btn" onClick={() => setCheckoutStep(1)}>
              Back
            </button>
            <button className="btn checkout-btn" onClick={proceedToPayment}>
              More Checkout
            </button>
          </div>
        </div>
      )}

      {checkoutStep === 3 && (
        <div className="checkout-form">
          <h3>Checkout: Payment</h3>
          <div className="checkout-fields">
            <label>
              Card Name
              <input
                value={payment.cardName}
                onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
              />
            </label>
            <label>
              Card Number
              <input
                value={payment.cardNumber}
                onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
              />
            </label>
            <label>
              Expiry
              <input
                value={payment.expiry}
                onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
              />
            </label>
            <label>
              CVV
              <input
                value={payment.cvv}
                onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
              />
            </label>
          </div>
          <div className="checkout-actions">
            <button className="btn" onClick={() => setCheckoutStep(2)}>
              Back
            </button>
            <button className="btn checkout-btn" onClick={handlePayment}>
              Pay
            </button>
          </div>
        </div>
      )}

      {checkoutStep === 4 && orderSuccess && (
        <div className="checkout-complete">
          <h3>Payment Complete</h3>
          <p>Thank you, {orderSuccess.customer.name}! Your order is confirmed.</p>
          <p>Order ID: {orderSuccess.id}</p>
          <button className="btn checkout-btn" onClick={resetCheckout}>
            Continue Shopping
          </button>
        </div>
      )}

      {history.length > 0 && (
        <div className="order-history">
          <h3>Order History</h3>
          {history.map((order) => {
            const itemCount = order.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
            const expanded = expandedOrders[order.id];
            return (
              <div key={order.id} className="order-card">
                <div>
                  <strong>{order.customer.name}</strong>
                  <p>{order.date}</p>
                </div>
                <div className="order-card-summary">
                  <p>Total: ${order.total.toFixed(2)}</p>
                  <p>{order.items.length} product(s)</p>
                  <p>Qty: {itemCount}</p>
                  <button className="order-toggle" onClick={() => toggleOrderDetails(order.id)}>
                    {expanded ? "Hide details" : "View details"}
                  </button>
                </div>
                {expanded && (
                  <div className="order-detail">
                    {order.items.map((item) => (
                      <div key={`${item.id}-${item.size}-${item.color}`} className="order-detail-item">
                        <img src={item.image} alt={item.name} />
                        <div className="order-detail-text">
                          <h4>{item.name}</h4>
                          <p>Color: {item.color || "-"}</p>
                          <p>Size: {item.size || "-"}</p>
                          <p>Qty: {item.quantity}</p>
                        </div>
                        <div className="order-detail-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Cart;

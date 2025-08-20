
import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { cartItems, foodList, clearCart } = useContext(StoreContext);
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/placeorder' } });
    } else {
      // Prefill form with logged-in user's name if available
      setForm(prev => ({ ...prev, name: user.name || '' }));
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getTotalPrice = () => {
    return Object.entries(cartItems).reduce((total, [foodId, qty]) => {
      const item = foodList.find(f => f.id.toString() === foodId);
      return item ? total + item.price * qty : total;
    }, 0);
  };

  const subtotal = getTotalPrice();
  const tax = +(subtotal * 0.05).toFixed(2);
  const deliveryFee = subtotal < 300 ? 30 : 0;
  const total = subtotal + tax + deliveryFee;

  const handleOrder = (e) => {
    e.preventDefault();

    if (!form.name || !form.address || !form.phone) {
      alert('Please fill all fields');
      return;
    }

    // ✅ Send order along with user info to backend
    const orderData = {
      userId: user?.email, // or user id if available
      items: cartItems,
      total,
      deliveryDetails: form
    };
    console.log('Order placed:', orderData);

    setOrderPlaced(true);
    clearCart();

    setTimeout(() => navigate('/'), 3000);
  };

  if (Object.keys(cartItems).length === 0 && !orderPlaced) {
    return (
      <div className="container text-center py-5">
        <h3>Your cart is empty 🛒</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">📦 Place Your Order</h2>

      {orderPlaced ? (
        <div className="alert alert-success">
          🎉 Order placed successfully! Redirecting to home...
        </div>
      ) : (
        <div className="row">
          {/* Order Summary */}
          <div className="col-md-6">
            <h5>🧾 Order Summary</h5>
            <ul className="list-group mb-3">
              {Object.entries(cartItems).map(([foodId, qty]) => {
                const food = foodList.find(f => f.id.toString() === foodId);
                if (!food) return null;

                return (
                  <li key={foodId} className="list-group-item d-flex justify-content-between">
                    <div>{food.name} × {qty}</div>
                    <span>₹{food.price * qty}</span>
                  </li>
                );
              })}
              <li className="list-group-item d-flex justify-content-between">
                <strong>Subtotal</strong>
                <strong>₹{subtotal.toFixed(2)}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </li>
              {deliveryFee > 0 && (
                <li className="list-group-item d-flex justify-content-between">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </li>
              )}
              <li className="list-group-item d-flex justify-content-between">
                <strong>Total</strong>
                <strong>₹{total.toFixed(2)}</strong>
              </li>
            </ul>
          </div>

          {/* Delivery Form */}
          <div className="col-md-6">
            <h5>📮 Delivery Details</h5>
            <form onSubmit={handleOrder}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="btn btn-success w-100" type="submit">
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;

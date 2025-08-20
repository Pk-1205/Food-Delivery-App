
import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const {
    cartItems,
    foodList,
    addToCart,
    removeFromCart,
    clearCart,
  } = useContext(StoreContext);

  // Show loading while foodList is not available
  if (foodList.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading your cart...</h4>
      </div>
    );
  }

  // Show empty cart message
  if (Object.keys(cartItems).length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3>Your cart is empty 🛒</h3>
        <p>
          Go to <Link to="/explore">Explore</Link> and add some delicious food!
        </p>
      </div>
    );
  }

  // Calculate total cart price
 //   // Calculate total cart price
  const getTotalPrice = () => {
    return Object.entries(cartItems).reduce((total, [foodId, quantity]) => {
      const food = foodList.find(item => item.id === foodId);
      if (!food) {
        console.warn(`Food not found for ID: ${foodId}`);
        return total;
      }
      return total + food.price * quantity;
    }, 0);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">🛒 Your Cart</h2>
      <table className="table align-middle table-hover">
        <thead>
          <tr>
            <th>Food</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(cartItems).map(([foodId, quantity]) => {
            const food = foodList.find(f => f.id.toString() === foodId);
            if (!food) return null;

            return (
              <tr key={foodId}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                    <div className="ms-3">
                      <h6 className="mb-0">{food.name}</h6>
                      <small className="text-muted">{food.description}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => removeFromCart(food.id)}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => addToCart(food.id)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>₹{food.price}</td>
                <td>₹{food.price * quantity}</td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFromCart(food.id)}
                  >
                    <i className="bi bi-trash"></i> Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <div>
          <h4>Total: ₹{getTotalPrice().toLocaleString()}</h4>
          {getTotalPrice() < 300 && (
            <p className="text-warning mt-1" style={{ fontSize: '0.95rem' }}>
              ⚠️ Orders below ₹300 will include a ₹30 delivery fee.
            </p>
          )}
        </div>
        <div>
          <button className="btn btn-danger me-2" onClick={clearCart}>
            Clear Cart
          </button>
          <Link className="btn btn-success" to="/placeorder">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;


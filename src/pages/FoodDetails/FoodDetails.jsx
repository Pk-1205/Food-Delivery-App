
import React, { useContext } from 'react';
import './Fooddetails.css';
import { useParams, Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const FoodDetails = () => {
  const { id } = useParams();
  const { foodList, cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const foodItem = foodList.find((item) => item.id === id);
 // convert id to number
  const quantity = cartItems[foodItem?.id] || 0;

  if (!foodItem) {
    return (
      <div className="text-center py-5">
        <h2 className="text-danger">❌ Food item not found</h2>
        <Link to="/" className="btn btn-outline-primary mt-3">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-5 align-items-center">
        {/* Image */}
        <div className="col-lg-6 text-center">
          <img
            src={foodItem.imageUrl}
            alt={foodItem.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '420px', objectFit: 'cover' }}
          />
        </div>

        {/* Details */}
        <div className="col-lg-6">
          <h1 className="fw-bold mb-3">{foodItem.name}</h1>
          <p className="text-muted fs-5">{foodItem.description}</p>
          <h3 className="text-success fw-semibold mt-3">₹{foodItem.price}</h3>

          <div className="d-flex gap-4 mt-4 align-items-center">
            {quantity === 0 ? (
              <button
                className="btn btn-success btn-lg"
                onClick={() => addToCart(foodItem.id)}
              >
                Add to Cart
              </button>
            ) : (
              <div className="d-flex align-items-center gap-3">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeFromCart(foodItem.id)}
                >
                  –
                </button>
                <span style={{ fontSize: '1.5rem', minWidth: '2rem', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  className="btn btn-outline-success"
                  onClick={() => addToCart(foodItem.id)}
                >
                  +
                </button>
              </div>
            )}
              <Link className="btn btn-success" to="/placeorder">
                        Proceed to Checkout
                      </Link>

            <Link to="/" className="btn btn-outline-secondary btn-lg">Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;

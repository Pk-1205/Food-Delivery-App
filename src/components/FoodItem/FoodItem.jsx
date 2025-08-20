import React from 'react';
import './FoodItem.css';
import { Link } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FoodItem = ({
  name,
  description,
  id,
  imageUrl,
  price,
  category,
  onAdd,
  onRemove,
  quantity = 0, // ✅ Optional prop for showing cart quantity
}) => {
  return (
    <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center'>
      <div className="dish-card text-center p-3 shadow rounded h-100 position-relative">

        {/* 🔼 Add & Remove Buttons */}
        <div className="position-absolute top-0 end-0 m-2 d-flex flex-column gap-1 align-items-center">
          <button
            className="btn btn-success btn-sm rounded-circle"
            onClick={() => onAdd?.(id)}
            title="Add to Cart"
          >
            <FaPlus size={12} />
          </button>

          {/* ✅ Show quantity if in cart */}
          {quantity > 0 && (
            <span className="badge bg-secondary small my-1">{quantity}</span>
          )}

          <button
            className="btn btn-danger btn-sm rounded-circle"
            onClick={() => onRemove?.(id)}
            title="Remove from Cart"
            disabled={quantity === 0}
          >
            <FaMinus size={12} />
          </button>
        </div>

        <Link to={`/food/${id}`} className="dish-image-wrapper mb-2 d-block text-decoration-none">
          <img src={imageUrl} alt={name} className="img-fluid rounded dish-image" />
        </Link>

        <div className="dish-info mt-2">
          <h5 className="fw-bold">{name}</h5>
          <p className="text-muted">{description}</p>
          <p><strong>₹{price}</strong></p>

          <Link className="btn btn-primary btn-sm mt-2" to={`/food/${id}`}>
            View Food
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;

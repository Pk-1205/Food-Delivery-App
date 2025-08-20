
import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ filteredList }) => {
  const { foodList, cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const displayList = filteredList ?? foodList;

  if (!foodList || foodList.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (displayList.length === 0) {
    return (
      <div className="text-center py-5">
        <h4 className="text-muted">🍽️ No matching food items found.</h4>
        <p>Try another search or category.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row">
        {displayList.map((food) => (
          <FoodItem
            key={food.id}
            id={food.id}
            name={food.name}
            description={food.description}
            price={food.price}
            imageUrl={food.imageUrl}
            category={food.category}
            onAdd={addToCart}
            onRemove={removeFromCart}
            quantity={cartItems[food.id] || 0} // ✅ pass cart quantity
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;

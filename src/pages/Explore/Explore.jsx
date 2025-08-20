import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import './Explore.css';

function Explore() {
  const { foodList, cartItems, addToCart, removeFromCart } = useContext(StoreContext); // ✅ include cart logic
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedcategory, setSelectedcategory] = useState('All');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    let filtered = foodList;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedcategory !== 'All') {
      filtered = filtered.filter(
        (item) => item.category.toLowerCase() === selectedcategory.toLowerCase()
      );
    }

    setFilteredList(filtered);
  }, [searchTerm, selectedcategory, foodList]);

  const categories = ['All', 'Veg', 'Non-veg'];

  return (
    <div className="container py-5">
      {/* Search */}
      <div className="search-bar-wrapper mb-4">
        <input
          type="text"
          className="form-control custom-search-input"
          placeholder="🔍 Search for food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Buttons */}
      <div className="d-flex flex-wrap justify-content-center mb-4 gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn btn-outline-primary category-btn ${
              selectedcategory === category ? 'active' : ''
            }`}
            onClick={() => setSelectedcategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Display Food Items */}
      <FoodDisplay
        filteredList={filteredList}
        onAdd={addToCart}
        onRemove={removeFromCart}
        cartItems={cartItems}
      />
    </div>
  );
}

export default Explore;

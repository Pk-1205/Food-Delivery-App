

import { createContext, useEffect, useState } from "react";
import { fetchFoodList } from "../service/foodService";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [foodList, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // ✅ Load food list from API
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchFoodList();
        setFoodList(data);
      } catch (err) {
        console.error("Error loading food list:", err);
      }
    }
    loadData();
  }, []);

  // ✅ Load cart from localStorage on first load
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add item to cart
  const addToCart = (foodId) => {
    setCartItems((prevCart) => ({
      ...prevCart,
      [foodId]: (prevCart[foodId] || 0) + 1,
    }));
  };

  // ✅ Remove item from cart
  const removeFromCart = (foodId) => {
    setCartItems((prevCart) => {
      if (!prevCart[foodId]) return prevCart;
      const updatedCart = { ...prevCart };
      updatedCart[foodId]--;
      if (updatedCart[foodId] <= 0) {
        delete updatedCart[foodId];
      }
      return updatedCart;
    });
  };

  // ✅ Clear the entire cart
  const clearCart = () => {
    setCartItems({});
  };

  // ✅ Get total item count in cart
  const getCartCount = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  return (
    <StoreContext.Provider
      value={{
        foodList,
        setFoodList,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

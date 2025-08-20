// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ only use Routes and Route here
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Explore from './pages/Explore/Explore';
import FoodDetails from './pages/FoodDetails/FoodDetails';
import Footer from './pages/Footer/Footer';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Login from './Login/login';
import Signup from './Signup/Signup';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />




        </Routes>
      </div>
      <Footer />
    </>
  );

}

export default App;



import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { AuthContext } from '../../context/AuthProvider';

function Navbar({ theme, toggleTheme }) {
  const { cartItems } = useContext(StoreContext);
  const { user, logoutUser } = useContext(AuthContext); // get user state
  const [active, setActive] = useState('home');
  const totalCartItems = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark bg-black' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={assets.logo} alt="Food App Logo" className="navbar-logo me-2" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={active === 'home' ? "nav-link fs-5 fw-bold active" : "nav-link fs-5"} to="/" onClick={() => setActive('home')}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className={active === 'explore' ? "nav-link fs-5 fw-bold active" : "nav-link fs-5"} to="/explore" onClick={() => setActive('explore')}>Explore</Link>
            </li>
            <li className="nav-item">
              <Link className={active === 'contact' ? "nav-link fs-5 fw-bold active" : "nav-link fs-5"} to="/contact" onClick={() => setActive('contact')}>Contact</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link to="/cart" className="position-relative navbar-cart text-decoration-none text-dark">
              <img src={assets.cart} alt="Cart" className="cart-icon" />
              {totalCartItems > 0 && (
                <span className="cart-count badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
                  {totalCartItems}
                </span>
              )}
            </Link>

            <button className="btn btn-outline-primary" onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>

            {/* Only show Login/Signup if user is not logged in */}
            {!user ? (
              <>
                <button className="btn btn-outline-primary" onClick={() => navigate('/login')}>Login</button>
                <button className="btn btn-outline-success" onClick={() => navigate('/signup')}>Sign Up</button>
              </>
            ) : (
              <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // optional for custom hover

const Footer = () => {
  return (
    // Use bg-dark and text-light directly to fix dark mode
    <footer data-bs-theme="dark" className="footer-custom bg-dark text-light pt-5 pb-4 mt-5">
      <div className="container text-start">
        <div className="row gy-4">

          {/* About */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">
              <i className="bi bi-emoji-smile me-2"></i> About <span className="text-warning">FoodieHub</span>
            </h5>
            <p>Delicious meals delivered hot and fresh to your doorstep.<br />Order now and satisfy your cravings!</p>
            <div className="d-flex gap-3 fs-5 mt-3">
              <a href="#" className="text-light"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-light"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-light"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link className="text-light text-decoration-none" to="/">Home</Link></li>
              <li><Link className="text-light text-decoration-none" to="/explore">Explore</Link></li>
              <li><Link className="text-light text-decoration-none" to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Popular Items */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Popular Items</h6>
            <ul className="list-unstyled">
              <li className="text-light">Biryani</li>
              <li className="text-light">Veg Thali</li>
              <li className="text-light">Ice Cream</li>
              <li className="text-light">Cake</li>
              <li className="text-light">Lassi</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Contact Info</h6>
            <p className="mb-2"><i className="bi bi-geo-alt-fill me-2"></i>123 Foodie Street, Delhi, India</p>
            <p className="mb-2"><i className="bi bi-telephone-fill me-2"></i>+91 98765 43210</p>
            <p><i className="bi bi-envelope-fill me-2"></i>support@foodiehub.com</p>
          </div>

        </div>

        <hr className="text-secondary mt-4" />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} <strong>FoodieHub</strong>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';
import './Home.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

function Home() {
  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero-section container d-flex align-items-center justify-content-between flex-wrap-reverse">
        <div className="hero-text">
          <h1 className="text-primary-emphasis">Delicious Food Delivered To You</h1>
          <p className="text-secondary">Experience the best dishes from top-rated restaurants, delivered hot and fresh.</p>
          <Link to="/explore" className="btn btn-warning btn-lg mt-3">Explore Menu</Link>
        </div>
        <div className="hero-image">
          <img src={assets.logo} alt="Hero Dish" className="img-fluid rounded shadow" />
        </div>
      </section>

      {/* Category Section */}
      <section className="category-section py-5">
        <div className="container text-center">
          <h2 className="mb-4">🍱 Explore Categories</h2>
          <div className="row g-4">
            {[{
              name: "Burger", img: assets.Burger
            }, {
              name: "Pizza", img: assets.pizza
            }, {
              name: "Noodles", img: assets.Nuddlus
            }, {
              name: "Veg Thali", img: assets.vegthali
            }, {
              name: "Biryani", img: assets.Biryani
            }, {
              name: "Chicken", img: assets.chiken
            }].map((item, i) => (
              <div className="col-6 col-md-4 col-lg-2" key={i}>
                <div className="category-card">
                  <img src={item.img} alt={item.name} />
                  <p>{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section className="dishes-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">🔥 Food Menu</h2>
          <FoodDisplay />
        </div>
      </section>

      {/* Call To Action */}
     <section className="cta-banner text-white text-center py-5">
  <div className="container bg-transparent">
    <h2 className="mb-3">Ready to Satisfy Your Cravings?</h2>
    <p>Browse the full menu and place your order in just a few clicks.</p>
    <button className="btn btn-primary btn-lg mt-2">Order Now</button>
  </div>
</section>


    </div>
  );
}

export default Home;

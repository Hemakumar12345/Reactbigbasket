import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Create and style this file for custom CSS

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Big Basket 🛒</h1>
      <p className="tagline">Your one-stop shop for fresh groceries and daily needs!</p>

      <div className="category-grid">
        <Link to="/veg" className="category-card veg">
          🥦 <h2>Veg Items</h2>
          <p>Fresh and organic vegetables picked just for you.</p>
        </Link>

        <Link to="/nonVeg" className="category-card non-veg">
          🍗 <h2>Non-Veg Items</h2>
          <p>Premium quality meat, poultry, and seafood.</p>
        </Link>

        <Link to="/milk" className="category-card milk">
          🥛 <h2>Milk</h2>
          <p>Dairy essentials: milk, curd, paneer & more.</p>
        </Link>

        <Link to="/chocolate" className="category-card chocolate">
          🍫 <h2>Chocolates</h2>
          <p>Delicious treats and sweet indulgences.</p>
        </Link>

        <Link to="/cart" className="category-card cart">
          🛒 <h2>Cart</h2>
          <p>Review and manage your selected items.</p>
        </Link>

        <Link to="/order" className="category-card order">
          📦 <h2>Orders</h2>
          <p>Track your recent purchases and delivery status.</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;

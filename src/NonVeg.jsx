import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './nonvegstyle.css';
import { addToCart } from './store';

function NonVeg() {
  const nonVegProducts = useSelector(state => state.products.nonVeg);
  const dispatch = useDispatch();

  const [maxPrice, setMaxPrice] = useState(500); // Default maximum price
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtered based on max price
  const filteredProducts = nonVegProducts.filter(product => product.price <= maxPrice);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSliderChange = (e) => {
    setMaxPrice(parseInt(e.target.value));
    setCurrentPage(1); // Reset pagination on filter change
  };

  return (
    <div className="nonveg-container">
      <h1 className="nonveg-title">🍗 Non-Veg Products</h1>

      {/* Max Price Filter */}
      <div className="filter-slider">
        <label htmlFor="priceRange">Max Price: ₹{maxPrice}</label>
        <input
          id="priceRange"
          type="range"
          min="0"
          max="2000"
          step="10"
          value={maxPrice}
          onChange={handleSliderChange}
        />
      </div>

      <div className="nonveg-card-grid">
        {currentItems.map((product, index) => (
          <div key={index} className="nonveg-card">
            <img src={product.image} alt={product.name} width={150} height={150} />
            <div className="nonveg-name">{product.name}</div>
            <div className="nonveg-price">₹{product.price}</div>
            <button
              className="add-to-cart-btn"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          ⬅️ Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next ➡️
        </button>
      </div>
    </div>
  );
}

export default NonVeg;

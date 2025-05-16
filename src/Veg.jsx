import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';
import './vegstyle.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


function Veg() {
  const vegProducts = useSelector((state) => state.products.veg);
  const dispatch = useDispatch();

  const priceRanges = [
    { value: 'Rs 1 to Rs 50', min: 1, max: 50 },
    { value: 'Rs 51 to Rs 100', min: 51, max: 100 },
    { value: 'Rs 101 to Rs 200', min: 101, max: 200 },
    { value: 'Rs 201 to Rs 500', min: 201, max: 500 }
  ];

  const [selectedRanges, setSelectedRanges] = useState([]);

  const handleCheckboxChange = (selectedRange) => {
    if (selectedRanges.includes(selectedRange)) {
      const updated = selectedRanges.filter(r => r !== selectedRange);
      setSelectedRanges(updated);
    } else {
      const updated = [...selectedRanges, selectedRange];
      setSelectedRanges(updated);
    }
    setCurrentPage(1); // Reset to first page on filter change
  };

  const clearFilters = () => {
    setSelectedRanges([]);
    setCurrentPage(1); // Reset to first page
  };

  const activeRanges = priceRanges.filter(range => selectedRanges.includes(range.value));
  const filteredProducts = selectedRanges.length === 0
    ? vegProducts
    : vegProducts.filter(product =>
        activeRanges.some(range =>
          product.price >= range.min && product.price <= range.max
        )
      );

  // Pagination state
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="veg-container">
      <h1 className="veg-title">🥦 Veg Products</h1>

      <div>
        <button onClick={clearFilters}>Clear All Filters</button>
      </div>

      <div>
        {priceRanges.map(range => (
          <label key={range.value}>
            <input
              type="checkbox"
              checked={selectedRanges.includes(range.value)}
              onChange={() => handleCheckboxChange(range.value)}
            />
            {range.value}
          </label>
        ))}
      </div>

      <div className="veg-card-grid">
        {currentItems.map((product, index) => (
          <div key={index} className="veg-card">
            <img src={product.image} alt={product.name} width={150} height={150} />
            <div className="veg-name">{product.name}</div>
            <div className="veg-price">₹{product.price}</div>
            <button
              className="add-to-cart-btn"
              onClick={() => {dispatch(addToCart(product));toast.success('Product added to cart successfully!');}}
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

export default Veg;

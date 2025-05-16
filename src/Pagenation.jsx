import React, { useState } from 'react';
import './pagenation.css';


function Pagenation() {
  const items = [
    'Tomato', 'Onion', 'Carrot', 'Cabbage', 'Spinach',
    'Cauliflower', 'Broccoli', 'Beetroot', 'BellPepper', 'Chicken',
    'Fish', 'Mutton', 'Prawns', 'Eggs', 'Crub',
    'Turkey', 'Duck', 'Lobster', 'Potato', 'Squid'
  ];
  
  const itemPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItems = currentPage * itemPerPage;
  const indexOfFirstItems = indexOfLastItems - itemPerPage;
  const currentItems = items.slice(indexOfFirstItems, indexOfLastItems);
  const totalPages = Math.ceil(items.length / itemPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <h2>Veg & Fruit List</h2>
      <ul>
        {currentItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}

export default Pagenation;

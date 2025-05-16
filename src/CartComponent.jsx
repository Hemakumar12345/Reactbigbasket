// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { incCart, decCart } from './store';

// function CartComponent() {
//   const cartObjects = useSelector(state => state.cart);
//   const dispatch = useDispatch();

//   return (
//     <div>
//       {cartObjects.map((item, index) => (
//         <div key={index}>
//           <h3>{item.name}</h3>
//           <p>Quantity: {item.quantity}</p>
//           <p>Price: ${item.price}</p>
//           <button onClick={() => dispatch(incCart(item))}>+</button>
//           <button onClick={() => dispatch(decCart(item))}>-</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default CartComponent;

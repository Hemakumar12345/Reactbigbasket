import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Veg from './Veg';
import NonVeg from './NonVeg';
import Home from './Home';
import Cart from './Cart';
import Milk from './Milk';
import Chocolate from './Chocolate';
import Signing from './Signing';
import Orders from './Orders';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import './mystyles.css';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Pagenation from './Pagenation';
import { toast, ToastContainer } from 'react-toastify'; // ✅ Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import Signup from './signup';
import { LogOut } from './store';

function App() {
   const dispatch = useDispatch();
  // Get cart items from Redux store
  const cartObject = useSelector(globalState => globalState.cart);
  const totalCartCount = cartObject.reduce((totalSum, item) => totalSum + item.quantity, 0); 

  //get the user auth and username from store

  const isAuthenticated=useSelector((state)=>state.users.isAuthenticated);
  const currentUser=useSelector((state)=>state.users.currentUser);

  

  return (
    <BrowserRouter>
      <>
        <nav className="menu">
          <Link to="/home">Home</Link>
          <Link to="/veg">VegItem</Link>
          <Link to="/nonVeg">NonVeg</Link>
          <Link to="/milk">Milk</Link>
          <Link to="/chocolate">Chocolate</Link>
          {/* <Link to="/signing">Signing</Link> */}
          <Link to="/cart">Cart ({totalCartCount})</Link>
          <Link to="/order">Orders</Link>
          <Link to="/aboutUs">AboutUs</Link>
          <Link to="/contactUs">ContactUs</Link>
          {/* <Link to="/Pagenation">Pagenation</Link> */}

          <Link to="/signout">signout</Link>

           
          {isAuthenticated?(
            <div>
              <span>Welcome,{currentUser.username}</span>
              <button onClick={() => dispatch(LogOut())}>LogOut</button>

            </div>

          ):(
            <Link to="/signing">SignIn</Link>
          )}
        </nav>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonVeg" element={<NonVeg />} />
          <Route path="/milk" element={<Milk />} />
          <Route path="/chocolate" element={<Chocolate />} />
          <Route path="/signing" element={<Signing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs />} />
          {/* <Route path="/Pagenation" element={<Pagenation />} /> */}
          
          <Route path="/signout" element={<Signup />} />
        </Routes>
        
        {/* ✅ Corrected autoClose spelling */}
       {/* <ToastContainer position="top-center" autoClose={200} />


        <div>
          <button onClick={() => toast("wow so easy")}>Notify!</button>
        </div> */}
      </>
        <ToastContainer position="top-left" autoClose={200} />
        <div>
          <button onClick={() => toast("wow so easy")}>Notify!</button>
        </div>
    </BrowserRouter>

    
  );

}
export default App;

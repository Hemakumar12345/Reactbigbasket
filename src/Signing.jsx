import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser, registerUser } from './store'; // ensure both actions are exported
import './Signing.css';

function Signing() {
  const [showSignup, setShowSignup] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sign In handler
  const handleLogin = (data) => {
    dispatch(LoginUser(data));
    navigate('/veg');
  };

  // Sign Up handler
  const handleSignup = (data) => {
    dispatch(registerUser(data));
    alert('Registration Successful');
    reset(); // clear form
    setShowSignup(false); // return to sign-in
  };

  return (
    <div className="signin-container">
      {showSignup ? (
        <>
          <h2>User Sign Up</h2>
          <form onSubmit={handleSubmit(handleSignup)}>
            <input type="text" placeholder="Username" {...register('username')} />
            <input type="password" placeholder="Password" {...register('password')} />

            <select {...register("gender")}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <select {...register("category")}>
              <option value="">Select Category</option>
              <option value="veg">Veg</option>
              <option value="nonveg">Non-Veg</option>
            </select>

            <button type="submit">Sign Up</button>
          </form>
          <p>
            Already have an account?{" "}
            <button onClick={() => setShowSignup(false)} className="link-button">Sign In</button>
          </p>
        </>
      ) : (
        <>
          <h2>User Sign In</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <input type="text" placeholder="Username" {...register('username')} />
            <input type="password" placeholder="Password" {...register('password')} />
            <button type="submit">Sign In</button>
          </form>
          <p>
            New user?{" "}
            <button onClick={() => setShowSignup(true)} className="link-button">Sign Up</button>
          </p>
        </>
      )}
    </div>
  );
}

export default Signing;

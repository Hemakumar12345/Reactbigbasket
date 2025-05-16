import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from './store';
import './Signing.css';

function Signing() {
  const [showSignup, setShowSignup] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    dispatch(LoginUser(data));
    navigate('/veg');
  };

  const handleSignup = (data) => {
    // Handle signup logic (e.g., dispatch signup action)
    console.log('User registered:', data);
    setShowSignup(false); // After signup, go back to login
  };

  return (
    <div className="signin-container">
      {showSignup ? (
        <>
          <h2>User SignUp</h2>
          <form onSubmit={handleSubmit(handleSignup)}>
            <input type="text" placeholder="Username" {...register('username')} />
            <input type="email" placeholder="Email" {...register('email')} />
            <input type="password" placeholder="Password" {...register('password')} />
            <button type="submit">SignUp</button>
          </form>
          <p>
            Already have an account?{' '}
            <button onClick={() => setShowSignup(false)} className="link-button">SignIn</button>
          </p>
        </>
      ) : (
        <>
          <h2>User SignIn</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <input type="text" placeholder="Username" {...register('username')} />
            <input type="password" placeholder="Password" {...register('password')} />
            <button type="submit">SignIn</button>
          </form>
          <p>
            New user?{' '}
            <button onClick={() => setShowSignup(true)} className="link-button">SignUp</button>
          </p>
        </>
      )}
    </div>
  );
}

export default Signing;

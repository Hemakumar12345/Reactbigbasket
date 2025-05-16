import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { LoginUser } from './store';
import './Signing.css';

function Signing() {
  let { register, handleSubmit } = useForm();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let myFunc = (data) => {
    dispatch(LoginUser(data));
    navigate("/veg");
  };

  return (
    <div className="signin-container">
      <h2>User SignIn</h2>
      <form onSubmit={handleSubmit(myFunc)}>
        <input type="text" placeholder="Username" {...register('username')} />
        <input type="password" placeholder="Password" {...register('password')} />
        <button type="submit">SignIn</button>
      </form>
      <p>
        New user? <Link to="/signup">SignUp</Link>
      </p>
    </div>
  );
}

export default Signing;

import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './store';
import { useForm } from 'react-hook-form';

import './signup.css';



function Signup() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myFunc = (data) => {
    dispatch(registerUser(data));
    alert('Registration Successful');
    navigate('/sign');
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit(myFunc)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username")}
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />

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

        <button type="submit">SignUP</button>
      </form>
    </div>
  );
}

export default Signup;

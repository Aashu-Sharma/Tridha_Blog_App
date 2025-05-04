import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Input, Button} from './index.js';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {login as authLogin} from '../store/authSlice.js';
import authService from '../appwrite/auth.config.js';
import isAdmin from '../utils/AdminUtil.js';

function Login() {
  const [error, setError] = useState("");
  const {register, handleSubmit} = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data);
      console.log("Session: ",session);
      if(session){
        const userData = await authService.getCurrentUser();
        userData.isAdmin = isAdmin(userData.email);
        console.log("isAdmin: ",userData.isAdmin);
        console.log("UserData: ",userData);
        if(userData){
          // console.log(userData);a
          dispatch(authLogin({userData}));
          navigate('/');
        }
      }
    } catch (error) {
      setError("An error occured while logging in the user: ", error.message);
    }
  }

  return (
    <div id="form-container">
      <div className="inner-container">
        <h2>Create an account</h2>
        <p>
          Don't have an account, click here to <Link to="/signup" className="login">Register</Link>
        </p>

        <form onSubmit={handleSubmit(login)}>
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            className = "input"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              }
            })}
             
          />
          <Input
            label="Password: "
            placeholder="Enter your Password"
            type="password"
            className = "input"
            {...register("password", {
              required: true,
            })}
          />
          <Button type='submit'>Sign in</Button>
        </form>
      </div>
    </div>
  );
}

export default Login
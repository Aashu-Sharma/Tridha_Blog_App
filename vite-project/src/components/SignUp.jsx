import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button } from './index.js';
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth.config.js';
import { login as authLogin } from '../store/authSlice.js'
import '../App.css'
import isAdmin from "../utils/AdminUtil.js";

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const signUp = async (data) => {
    console.log("SignUp: ", data)
    setError("");
    try {
      const session = await authService.createAccont(data);
      console.log("Session: ", session);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log("UserData while signing: ", userData)
        userData.isAdmin = isAdmin(userData.email);
        if (userData) {
          dispatch(authLogin({userData}));
          navigate('/')
        }
      }
    } catch (error) {
      setError("An error occured while signing up the user: ", error.message);
    }
  }

  return (
    <div id="form-container">
      <div className="inner-container">
        <h2>Create an account</h2>
        <p>
          Already have an account, click here to <Link to="/login" className="login">Login</Link>
        </p>

        <form onSubmit={handleSubmit(signUp)}>
          <Input
            label="Name: "
            type="text"
            placeholder="Enter your name"
            className="input"
            {...register("name", {
              required: true,
            })}
          />
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            className="input"
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
            className="input"
            {...register("password", {
              required: true,
            })}
          />

          <Button type='submit'>Sign Up</Button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
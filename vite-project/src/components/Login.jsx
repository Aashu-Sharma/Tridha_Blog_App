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


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { login as authLogin } from '../store/authSlice';
// import authService from '../appwrite/auth';
// import { Input, Button, Logo } from './index';
// import { useDispatch } from 'react-redux';
// import { useForm } from 'react-hook-form'

// function Login() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { register, handleSubmit } = useForm();
//     const [error, setError] = useState('');

//     const login = async (data) => {
//         setError('');
//         try {
//             const session = await authService.login(data);
//             if (session) {
//                 const userData = await authService.getCurrentUser();
//                 if (userData) {
//                     dispatch(authLogin(userData));
//                     navigate('/');
//                 }
//             }
//         } catch (error) {
//             setError(error.message)
//         }
//     }

//     return (
//         <div
//             className='flex items-center justify-center w-full'
//         >
//             <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
//                 <div className="mb-2 flex justify-center">
//                     <span className="inline-block w-full max-w-[100px]">
//                         <Logo width="100%" />
//                     </span>
//                 </div>                              
//             </div>

//             <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
//             <p className="mt-2 text-center text-base text-black/60">
//                     Don&apos;t have any account?&nbsp;
//                     <Link
//                         to="/signup"
//                         className="font-medium text-primary transition-all duration-200 hover:underline"
//                     >
//                         Sign Up
//                     </Link>
//             </p>
//             {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

//             <form onSubmit={handleSubmit(login)} className='mt-8'>
//                 <div className='space-y-5'>
//                     <Input
//                         label = 'Email: '
//                         placeholder = 'Enter your email'
//                         type = 'email'
//                         {...register("email", {
//                             required: true,
//                             validate: {
//                                 matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                                 "Email address must be a valid address",
//                             }
//                         })}
//                     />

//                     <Input
//                         label = "Password: "
//                         placeholder = "Enter your password"
//                         type = 'password'
//                         {...register('password', {
//                             required: true,
//                         })}
//                     />

//                     <Button type='submit' className='w-full'>SignIn</Button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default Login
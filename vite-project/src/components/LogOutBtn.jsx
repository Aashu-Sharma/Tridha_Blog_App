import React from 'react';
import authService from '../appwrite/auth.config.js';
import {useDispatch} from 'react-redux';
import {logOut as authLogOut} from '../store/authSlice.js';

function LogOutBtn() {
    const dispatch = useDispatch();
    const logOutHandler = () => {
        authService.logOut()
        .then(() => {
            dispatch(authLogOut());
            console.log("user logged out successfully");
        })
    }

  return (
    <button onClick = {logOutHandler} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>LogOut</button>
  )
}

export default LogOutBtn
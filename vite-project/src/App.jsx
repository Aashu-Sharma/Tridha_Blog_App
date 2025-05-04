import { useEffect, useState } from 'react';
import {Layout} from './components/index.js';
import authService from './appwrite/auth.config.js';
import {useDispatch, useSelector} from 'react-redux';
import {login as authLogin, logOut} from './store/authSlice.js';
import {fetchPosts} from './store/postSlice.js';
import isAdmin from './utils/AdminUtil.js'
import './App.css';


function App() {
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData)
  const dispatch = useDispatch();
  
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        console.log("userdata: ", userData);
        console.log("user email: ", userData.email);

        userData.isAdmin = isAdmin(userData.email);
        console.log("isAdmin: ", userData.isAdmin);

        dispatch(authLogin({userData}));
      }else{
        dispatch(logOut());
      }
    }).catch((error) => {
      console.log("Error: ", error);
    }).finally(() => setLoading(false));
  }, [])


  useEffect(() => {
    dispatch(fetchPosts());
  }, [userData]);

  
  return !loading ? (
    <div className = "app" >
      <Layout/>
    </div>
  ) : null;
}

export default App
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Home } from "../src/components/index.js";
import App from './App.jsx';
import { SignUp, Login, LogOutBtn, Post } from './components/index.js';
import { Provider } from 'react-redux';
import store from './store/store.js';
import {AddEbooks, AddPost, AllPosts, EditPost} from './pages/index.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/logOut",
        element: < LogOutBtn/>,
      },

      {
        path: "/addPost",
        element: <AddPost />,
      },

      {
        path: "/addEbooks",
        element: <AddEbooks/>
      },

      {
        path: "/post/:slug",
        element: <Post />
      },

      {
        path: "/allPosts",
        element: <AllPosts />
      },

      {
        path: "/editPost/:slug",
        element: <EditPost />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
)

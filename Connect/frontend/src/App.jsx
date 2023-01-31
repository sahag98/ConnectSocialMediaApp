import { useState } from 'react'
import './App.css'
import Register from './pages/Register'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { getAuth, signInAnonymously } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { user: currentUser } = useSelector((state) => state.auth);

  const auth = getAuth();
  signInAnonymously(auth)
    .then(() => {
      // Signed in..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });


  const router = createBrowserRouter([
    {
      path: "*",
      element: currentUser ? <Home /> : <Login />
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'register',
      element: <Register />
    },
  ])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App

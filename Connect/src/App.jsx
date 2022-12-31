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

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Register />
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'home',
      element: <Home />
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App

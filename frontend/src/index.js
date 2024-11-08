import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter, RouterProvider
} from "react-router-dom";
import Login from './login/Login';
import Menu from './menu/Menu';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },{
    path: "/menu",
    element: <Menu/>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from "./utils/authProvider";
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout'
import Companies from './Pages/Companies';
import Products from './Pages/Products'
import Login from './Pages/Login';
import Reports from './Pages/Reports';
import { ProtectedRoute } from "./Routes/ProtectedRoute";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import FooterComponent from './Components/Footer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const routesForAuth = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Reports />
      }
    ]
  },
  {
    path: "/reports",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Reports />
      }
    ]
  },
  {
    path: "/companies",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Companies />
      }
    ]
  },
  {
    path: "/products",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Products />
      }
    ]
  }

]
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  ...routesForAuth
])
root.render(
  <React.StrictMode>
    <AuthProvider>

      <RouterProvider router={router} />

    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react'
import { ProtectedRoute } from "./ProtectedRoute";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Reports from '../Pages/Reports';
import Companies from '../Pages/Companies';
import Products from '../Pages/Products'
import Header from '../Components/Header';
import FooterComponent from '../Components/Footer';
import Login from '../Pages/Login';

type Props = {}

const Routes = (props: Props) => {
  
    const routesForAuth = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "",
                    element: <Reports/>
                }
            ]
        },
        {
            path: "/reports",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "",
                    element: <Reports/>
                }
            ]
        },
        {
            path: "/companies",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "",
                    element: <Companies/>
                }
            ]
        },
        {
            path: "/products",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "",
                    element: <Products/>
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
    return <RouterProvider router={router} />
};

export default Routes;
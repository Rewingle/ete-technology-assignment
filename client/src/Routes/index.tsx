import React from 'react'
import { ProtectedRoute } from "./ProtectedRoute";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Reports from '../Pages/Reports';

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
                    element: <div>REPORTS</div>
                }
            ]
        },
        {
            path: "/companies",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "",
                    element: <div>COMPANIES</div>
                }
            ]
        },
        {
            path: "/products",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "",
                    element: <div>PRODUCTS</div>
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
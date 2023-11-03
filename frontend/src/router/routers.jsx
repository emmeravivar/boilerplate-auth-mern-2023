import { createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import AuthLayout from '../layouts/AuthLayout'
import Layout from '../pages/layout/Layout'
import Home from '../pages/home/Home'
import Login from './../pages/auth/Login'
import Signup from './../pages/auth/Signup'
import ResetPassword from './../pages/auth/ResetPassword'
import NewPassword from './../pages/auth/NewPassword'
import AccountConfirm from './../pages/auth/AccountConfirm'
import AccessToDashboard from './../layouts/AccessToDashboard'
import Dashboard from './../pages/dashboard/Dashboard'
import Biography from '../pages/biography/Biography'


const Routers = createBrowserRouter([
    {   
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/biography",
                element: <Biography />
            },
            {
                path: "/access",
                element: <AuthProvider>
                            <AuthLayout />
                        </AuthProvider>,
                children: [
                {
                    path: '/access/login',
                    element: <Login />,
                },
                {
                    path: '/access/signup',
                    element: <Signup />,
                },
                {
                    path: '/access/reset-password',
                    element: <ResetPassword />,
                },
                {
                    path: '/access/reset-password/:token',
                    element: <NewPassword />,
                },
                {
                    path: '/access/confirm-account/:token',
                    element: <AccountConfirm />,
                },
                {
                    path: '/access/dashboard',
                    element: <AccessToDashboard />,
                    children: [ {
                        path: "/access/dashboard",
                        element: <Dashboard />
                        }
                    ]
                },
                ],
            }
        ]
    },
]);

export default Routers;
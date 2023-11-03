import { createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import AuthLayout from '../layouts/AuthLayout'
import Login from './../pages/auth/Login'
import Signup from './../pages/auth/Signup'
import ResetPassword from './../pages/auth/ResetPassword'
import NewPassword from './../pages/auth/NewPassword'
import AccountConfirm from './../pages/auth/AccountConfirm'
import AccessToDashboard from './../layouts/AccessToDashboard'
import Dashboard from './../pages/dashboard/Dashboard'


const Routers = createBrowserRouter([
    {
        path: "/",
        element: <AuthProvider>
                    <AuthLayout />
                </AuthProvider>,
        children: [
        {
            path: '/',
            element: <Login />,
        },
        {
            path: '/signup',
            element: <Signup />,
        },
        {
            path: '/reset-password',
            element: <ResetPassword />,
        },
        {
            path: '/reset-password/:token',
            element: <NewPassword />,
        },
        {
            path: '/confirm-account/:token',
            element: <AccountConfirm />,
        },
        {
            path: '/dashboard',
            element: <AccessToDashboard />,
            children: [ {
                path: "/dashboard",
                element: <Dashboard />
                }
            ]
        },
        ],
    },
    // {
    //     path: "/dashboard",
    //     // element: <AuthProvider>
    //     //             <AccessToDashboard />
    //     //         </AuthProvider>,
    //                     element: 
    //                 <AccessToDashboard />,
    //     children: [
                // {
                //     path: "/dashboard",
                //     element: <Dashboard />
                // }
    //     ]
    // },

]);

export default Routers;